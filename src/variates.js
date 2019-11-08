const { version: VERSION } = require('../package.json');

// 模板的临时下载目录
const DOWNLOAD_DIRECTORY = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.template`;

// 项目模板列表
const TEMPLATE_REPOLIST = ['koa-ts-demo'];

// git 用户名
const GIT_USER_NAME = 'SimpleCodeCX';

const GITHUB_API_HOST = 'https://api.github.com';

module.exports = {
  VERSION,
  DOWNLOAD_DIRECTORY,
  TEMPLATE_REPOLIST,
  GIT_USER_NAME,
  GITHUB_API_HOST,
};
