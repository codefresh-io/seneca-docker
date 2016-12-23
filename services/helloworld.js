'use strict'

var Seneca = require('seneca')


// Functionality in seneca is composed into simple
// plugins that can be loaded into seneca instances.


function rejector () {
 this.add('cmd:run', (msg, done) => {
   console.log(`${JSON.stringify(msg)}`);
   return done(null, {tag: 'rejector'})
 })
}

function approver () {
 this.add('cmd:run', (msg, done) => {
   return done(null, {tag: 'approver'})
 })
}

function getUserName () {
 this.add({role: 'user', cmd: 'name'}, function (msg, done) {
   console.log(`user:name ${JSON.stringify(msg)}`);
   return done(null, {msg:`hello ${msg.param}`});
   this.prior(msg, (err, reply) => {
     return done(null, {msg:`hello ${msg.param}`});
   })
 })
}


// Services can listen for messages using a variety of
// transports. In process and http are included by default.


Seneca()
 .use(approver)
 .listen({type: 'http', port: '8260', pin: 'cmd:*'})

Seneca()
 .use(getUserName)
 .listen({port:8270, host : '0.0.0.0'})


// Load order is important, messages can be routed
// to other services or handled locally. Pins are
// basically filters over messages


function handler (err, reply) {
 console.log('handler');
 console.log(err, reply)
}
