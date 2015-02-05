var express = require('express'),
  faye = require('faye'),
  http = require('http'),
  app = express(),
  host = 'localhost',
  mount = '/bayeux',
  port = process.env.PORT || 8080,
  server = http.createServer(app),
  bayeux = new faye.NodeAdapter({ mount: mount, timeout: 45 }),
  sclient = bayeux.getClient(),
  directory = require('./models/directory');

bayeux.attach(server);

/*jslint unparam: true*/
bayeux.addExtension({
  incoming: function (message, request, callback) {
    if (message && message.channel && message.channel === '/meta/subscribe') {
      if (message.subscription.indexOf('/channel') > -1) {
        directory.addChannel(message.subscription);
        directory.addUserToChannel(message.subscription, message.clientId);
      }
    }
    callback(message);
  }
});
/*jslint unparam: false*/

/*jslint unparam: true*/
app.get('/', function (req, res) {
  res.send('server started');
});
/*jslint unparam: false*/

server.listen(port, function () {
  sclient.subscribe('/diag/ping', function (clientId, channel) {
    sclient.publish('/diag/pong', { from: '/diag/pong', code: 200, clientId: clientId, channel: channel });
  });
});