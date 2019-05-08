export const adapter = {
  name: 'Send Email',
  id: '1',
  icon: 'envelope',
  description: 'Add a thing to the workflow',
  version: '0.0.1',
  files: {
    // index.j
    'index.js': `const get = require('./uuid')

    function main(){
      let id = get()
      console.log('Got ID: ' + id)
      
      return id;
    }
    
    main()`,

    // uuid.js
    'uuid.js': `const uuid = require('uuid/v4')

    const getUUID = () => uuid()
    module.exports = getUUID`,

    // pacakge.json
    'package.json': `{
      "name": "module",
      "version": "1.0.0",
      "main": "index.js",
      "license": "MIT",
      "dependencies": {
        "uuid": "^3.3.2"
      }
    }`,
  },
};
