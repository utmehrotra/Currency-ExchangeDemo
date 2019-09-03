const config = require('config');
const environmentVariablesConfig = config.get('env');


console.log(environmentVariablesConfig);
require('../startup/validate')(environmentVariablesConfig);

module.exports = environmentVariablesConfig;
