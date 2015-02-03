// var request = require('request'),
//   faye = require('faye'),
//   client = new faye.Client('http://localhost:8080/bayeux');

// var done = (function() {
//   var remaining = 0;
//   return function(test) {
//     test.done();
//     remaining++;
//     if (remaining < Object.keys(exports).length) return;
//     setTimeout(function() { process.kill() }, 1);
//   }
// }());

// exports['Test ping server'] =  function (test) {
//   var publication = client.publish('/diag/ping', {}),
//     start = Date.now();

//   publication.then(function() {
//     test.ok(true, 'server recieved ping from client');
//   }, function(err) {
//     test.ok(false, 'server did not recieve ping from client ' + err);
//     done(test);        
//   });

//  client.subscribe('/diag/pong', function(message) {
//     test.ok(true, 'recieved pong from server: ' + (Date.now() - start) + 'ms');
//     done(test);        
//   }, function(err) {
//     test.ok(false, 'did not recieve pong from server ' + err);
//     done(test); 
//   })
// }
