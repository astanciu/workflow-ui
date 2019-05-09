const util = require('./lib/module')

module.exports = async function(input){
  let output = input;
  output.id = util.uuid();
  output.updated_at = Date.now()
  output.ip = await util.getIP()

  return output;
}