'use strict';

var Seneca = require('seneca');

function handler (err, reply) {
  console.log('recieved response');
  console.log(err, reply)
}
debugger;
var host = !(process.env.HOST) ? "127.0.0.1" : process.env.HOST;

console.log(`host : ${host}`);


Seneca()
  //.use(local)
  .client({port: 8270, host:host})
  .act({role:"user", cmd:'name', param:"oleg"}, handler);

var i = 1;
setInterval(()=>{
  var param = "attempt" + ++i;
  Seneca()
    .client({port: 8270, host:host})
    .act({role:"user", cmd:'name', param: param}, handler);

}, 1000);
