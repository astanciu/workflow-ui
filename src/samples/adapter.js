export const adapter = {
  name: 'Send Email',
  id: '1',
  icon: 'envelope',
  description: 'Add a thing to the workflow',
  version: '0.0.1',
  files: {
    // index.j
    'index.js': `const util = require('./module')

module.exports = async function (input) {
  let output = input;
  output.id = util.uuid();
  output.updated_at = Date.now()
  output.ip = await util.getIP()

  return output;
}`,

    // uuid.js
    'module.js': `const uuid = require('uuid/v4')
const publicIp = require('public-ip');

module.exports.getIP = async () => await publicIp.v4()
module.exports.uuid = () => uuid()
`,

    // pacakge.json
    'package.json': `{
  "name": "module",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "public-ip": "^3.1.0",
    "uuid": "^3.3.2"
  }
}`,
  },
};
