const get = require('./lib/uuid')

function main(){
  let id = get()
  console.log('Got ID: ' + id)
  
  return id;
}

main()