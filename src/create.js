const fs = require('fs');
const path = require('path');
const axios = require('axios');
const ora = require('ora');
const Inquirer = require('inquirer');
let downloadGitReop = require('download-git-repo');
let ncp = require('ncp');
const shell = require('shelljs');
const MetalSmith = require('metalsmith');
let { render } = require('consolidate').ejs;
const { promisify } = require('util');
const {
  DOWNLOAD_DIRECTORY,
  TEMPLATE_REPOLIST,
  GIT_USER_NAME,
  GITHUB_API_HOST,
} = require('./variates');

render = promisify(render);
downloadGitReop = promisify(downloadGitReop);
ncp = promisify(ncp);


// 获取该项目的 tags
const fechTagList = async (repo) => {
  const { data } = await axios.get(`${GITHUB_API_HOST}/repos/${GIT_USER_NAME}/${repo}/tags`);
  return data;
};

// loading 效果
const waitFnloading = (fn, message) => async (...args) => {
  const spinner = ora(message);
  spinner.start();
  const result = await fn(...args);
  spinner.succeed();
  return result;
};

// 下载仓库代码到临时文件夹，并返回该文件夹地址
const download = async (repo, tag) => {
  let api = `${GIT_USER_NAME}/${repo}`;
  if (tag) {
    api += `#${tag}`;
  }
  const dest = `${DOWNLOAD_DIRECTORY}/${repo}`;
  await downloadGitReop(api, dest);
  return dest;
};

module.exports = async (projectName) => {
  // 选择一个模板
  const { repo } = await Inquirer.prompt({
    name: 'repo',
    type: 'list',
    message: 'please choise a template to create project',
    choices: TEMPLATE_REPOLIST,
  });

  // 选择 tag 版本
  let tags = await waitFnloading(fechTagList, 'fetching tags ....')(repo);
  tags = tags.map((item) => item.name);
  let tag;
  if (tags.length > 0) {
    const { _tag } = await Inquirer.prompt({
      name: 'tag',
      type: 'list',
      message: 'please choise tags to create project',
      choices: tags,
    });
    tag = _tag;
  }

  // 下载选择的模板代码
  const result = await waitFnloading(download, 'download template')(repo, tag);

  if (!fs.existsSync(path.join(result, 'ask.js'))) {
    await ncp(result, path.resolve(projectName));
  } else {
    await new Promise((resolve, reject) => {
      MetalSmith(__dirname)
        .source(result)
        .destination(path.resolve(projectName))
        .use(async (files, metal, done) => {
          const args = require(path.join(result, 'ask.js'));
          const obj = await Inquirer.prompt(args);
          const meta = metal.metadata();
          Object.assign(meta, obj);
          delete files['ask.js'];
          done();
        })
        .use((files, metal, done) => {
          const obj = metal.metadata();
          Reflect.ownKeys(files).forEach(async (file) => {
            if (file.includes('js') || file.includes('json')) {
              let content = files[file].contents.toString();
              if (content.includes('<%')) {
                content = await render(content, obj);
                files[file].contents = Buffer.from(content);
              }
            }
          });
          done();
        })
        .build((err) => {
          if (err) {
            reject();
          } else {
            resolve();
          }
        });
    });
  }
  shell.rm('-R', DOWNLOAD_DIRECTORY);
};
