const program = require('commander');
const path = require('path');
const { VERSION } = require('./variates');

const mapActions = {
  create: {
    alias: 'c',
    description: 'create a project',
    examples: [
      'koats create <project-name>',
    ],
  },
  config: {
    alias: 'conf',
    description: 'config project variable',
    examples: [
      'koats config set <k> <v>',
      'koats config get <k>',
    ],
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: [],
  },
};

Reflect.ownKeys(mapActions).forEach((action) => {
  program
    .command(action) // 配置命令的名字
    .alias(mapActions[action].alias) // 配置命令的别名
    .description(mapActions[action].description)// 配置命令对应的描述
    .action(() => {
      if (action === '*') {
        console.log(mapActions[action].description);
      } else {
        // 每个命令都对应一个文件夹
        const args = [...process.argv.slice(3)];
        require(path.resolve(__dirname, action))(...args);
      }
    });
});

// 监听用户的help 事件
program.on('--help', () => {
  console.log('\nExamples:');
  Reflect.ownKeys(mapActions).forEach((action) => {
    mapActions[action].examples.forEach((example) => {
      console.log(`  ${example}`);
    });
  });
});

program.version(VERSION).parse(process.argv);
