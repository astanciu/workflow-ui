const util = require('./lib/module')
const execa = require('execa');

module.exports = async function(input){
  const {stdout} = await execa('ls', ['.']);
  console.log(stdout);
  
  let output = input;
  output.id = util.uuid();
  output.updated_at = Date.now()
  output.ip = await util.getIP()

  return output;
}