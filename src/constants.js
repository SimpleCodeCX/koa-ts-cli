const { version } = require('../package.json');

// downloadDirectory 模板的临时下载目录
const downloadDirectory = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.template`;
module.exports = {
  version,
  downloadDirectory,
};
