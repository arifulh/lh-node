var express = require('express'),
  faye = require('faye'),
  http = require('http'),
  app = express(),
  host = 'localhost',
  mount = '/bayeux',
  port = process.env.PORT || 8080,
  server,
  bayeux,
  sclient,
  directory = require('./models/directory');

function createHttpServer(app) {w
  return http.createServer(app);
}

function createNodeAdapter(mount) {
  return new faye.NodeAdapter({ mount: mount, timeout: 45 });
}

server = createHttpServer(app);
bayeux = createNodeAdapter(mount);
sclient = bayeux.getClient();
bayeux.attach(server);


bayeux.addExtension({
  incoming: function(message, request, callback) {
    if (message && message.channel && message.channel === '/meta/subscribe') {
      if (message.subscription.indexOf('/channel') > -1 ) {

      }
    }
    callback(message);
  }
});

server.listen(port, function () {

  sclient.subscribe('/diag/ping', function (clientId, channel) {
    sclient.publish('/diag/pong', { from: '/diag/pong', code: 200, clientId: clientId, channel: channel });
  });


});



/*jslint unparam: true*/
app.get('/', function (req, res) {
  res.send('server started');
});
/*jslint unparam: false*/