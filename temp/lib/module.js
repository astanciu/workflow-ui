const uuid = require('uuid/v4')
const publicIp = require('public-ip');

module.exports.getIP = async () => await publicIp.v4()
module.exports.uuid = () => uuid()
