var request = require('request'),
  faye = require('faye'),
  client = new faye.Client('http://localhost:8080/bayeux'),
  done = (function () {
    var remaining = 0;
    return function (test) {
      test.done();
      remaining++;
      if (remaining < Object.keys(exports).length) { return; }
      setTimeout(function () { process.kill(); }, 1);
    };
  }()),
  directory = require('../models/directory');

exports['directory - reset state'] = function (test) {
  directory.resetDirectory();
  test.equal(directory.getAllChannels().channels['channel-one'], null, 'channel list should be empty');
  test.equal(directory.getAllChannels().channelCount, 0, 'channel count should be 0.');
  test.equal(directory.getChannelUsers('channel-one').users, null, 'channel user list should be empty');
  done(test);
};

exports['directory - initial state'] = function (test) {
  directory.resetDirectory();
  test.equal(directory.getAllChannels().channels['channel-one'], null, 'channel list should be empty');
  test.equal(directory.getAllChannels().channelCount, 0, 'channel count should be 0.');
  test.equal(directory.getChannelUsers('channel-one').users, null, 'channel user list should be empty');
  done(test);
};

exports['directory - adding channel'] = function (test) {
  directory.addChannel('channel-one');
  test.equal(directory.getAllChannels().channels['channel-one'], true, 'channel added to directory');
  test.equal(directory.getAllChannels().channelCount, 1, 'channel count should be 1.');
  test.equal(directory.getChannelUsers('channel-one').userCount, 0, 'channel user count should be initalized to 0.');
  done(test);
};

exports['directory - adding duplicate channel'] =  function (test) {
  directory.addChannel('channel-one');
  directory.addChannel('channel-one');
  directory.addChannel('channel-one');
  directory.addChannel('channel-one');
  test.equal(directory.getAllChannels().channels['channel-one'], true, 'channel added to directory');
  test.equal(directory.getAllChannels().channelCount, 1, 'channel count should be 1.');
  test.equal(directory.getChannelUsers('channel-one').userCount, 0, 'channel user count should be initalized to 0.');
  done(test);
};

exports['directory - adding multiple channels'] = function (test) {
  directory.resetDirectory();
  directory.addChannel('channel-one');
  directory.addChannel('channel-two');
  directory.addChannel('channel-three');
  directory.addChannel('channel-four');

  test.equal(directory.getAllChannels().channels['channel-zero'], null, 'channel-zero not added to directory');
  test.equal(directory.getAllChannels().channels['channel-one'], true, 'channel-one added to directory');
  test.equal(directory.getAllChannels().channels['channel-two'], true, 'channel-two added to directory');
  test.equal(directory.getAllChannels().channels['channel-three'], true, 'channel-three added to directory');
  test.equal(directory.getAllChannels().channels['channel-four'], true, 'channel-four added to directory');
  test.equal(directory.getAllChannels().channelCount, 4, 'channel count should be 4.');
  test.equal(directory.getChannelUsers('channel-one').userCount, 0, 'channel user count should be initalized to 0.');
  done(test);
};

exports['directory - removing channels from directory'] = function (test) {
  directory.resetDirectory();
  test.equal(directory.getAllChannels().channelCount, 0, 'channel count should be 0.');

  directory.addChannel('channel-one');
  directory.addChannel('channel-two');
  directory.addChannel('channel-three');
  directory.addChannel('channel-four');
  test.equal(directory.getAllChannels().channelCount, 4, 'channel count should be 4.');

  directory.removeChannel('channel-three');
  test.equal(directory.getAllChannels().channelCount, 3, 'channel count should be 3.');

  directory.removeChannel('channel-one');
  directory.removeChannel('channel-two');
  test.equal(directory.getAllChannels().channelCount, 1, 'channel count should be 1.');
  test.equal(directory.getAllChannels().channels['channel-two'], null, 'channel-two should not be in directory');

  directory.addChannel('channel-two');
  test.equal(directory.getAllChannels().channelCount, 2, 'channel count should be 2.');
  test.equal(directory.getAllChannels().channels['channel-two'], true, 'channel-two should be in directory');
  done(test);
};

exports['directory - find channel in directory'] =  function (test) {
  directory.resetDirectory();
  directory.addChannel('channel-two');
  test.equal(directory.findChannel('channel-two'), true, 'channel-two should be in directory');
  test.equal(directory.findChannel('channel-three'), null, 'channel-three should not be in directory');
  done(test);
};

exports['directory - add channel user to directory'] =  function (test) {
  directory.resetDirectory();
  directory.addChannel('channel-one');
  directory.addUserToChannel('channel-one', 'test-user-1');
  test.equal(directory.getChannelUsers('channel-one').userCount, 1, 'channel user count should be 1');
  test.equal(directory.getChannelUsers('channel-one').users['test-user-1'], true, 'channel user count should exists in list.');
  test.equal(directory.getChannelUsers('channel-one').users['test-user-12'], null, 'other users shouldnt.');
  done(test);
};

