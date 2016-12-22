'use strict';

var Seneca = require('seneca');

function handler (err, reply) {
  console.log('recieved response');
  console.log(err, reply)
}
debugger;

Seneca()
  //.use(local)
  .client(8270)//{port: 8270, pin: 'user:name', param:'oleg'})
  .act({role:"user", cmd:'name', param:"oleg"}, handler);
