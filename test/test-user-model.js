var request = require('request'),
  faye = require('faye'),
  client = new faye.Client('http://localhost:8080/bayeux'),
  done = (function () {
    var remaining = 0;
    return function (test) {
      test.done();
      remaining++;
      if (remaining < Object.keys(exports).length) { return; }
    };
  }()),

  user = require('../models/user');

exports['user - quick test'] = function (test) {
  test.equal(null, null, 'channel list should be empty');
  done(test);
};
