var request = require('request'),
  faye = require('faye'),
  client = new faye.Client('http://localhost:8080/bayeux')
  channel = require('../models/channel');


exports['channel - reset playlist'] = function(test) {
  var playlist;
  channel.resetPlaylist();
  playlist = channel.getPlaylist();
  
  test.equal(playlist.playlistLen, 0, 'channel playlist should be empty');
  test.equal(playlist.current, null, 'there should be no current video');
  test.done();
}

exports['channel - get playlist'] = function (test) {
  var playlist;
  channel.resetPlaylist();
  playlist = channel.getPlaylist();
  
  test.equal(playlist.playlistLen, 0, 'channel playlist should be empty');
  test.equal(playlist.current, null, 'there should be no current video');
  test.done();
};
  
exports['channel - add one video'] = function (test) {
  var playlist;
  channel.resetPlaylist();
  playlist = channel.addNewVideo('testvideo');
  
  test.equal(playlist.playlistLen, 1, 'channel playlist should be one');
  test.equal(playlist.current, 'testvideo', 'playlist current video should be "testvideo"');
  test.equal(playlist.add, 'testvideo', 'playlist current video should be "testvideo"');
  test.ok(playlist.startedAt, "playlist start time should be set");
  test.done();
};


exports['channel - add multiple videos'] = function (test) {
  var playlist;
  channel.resetPlaylist();
  channel.addNewVideo('testvideo1');
  channel.addNewVideo('testvideo2');
  channel.addNewVideo('testvideo3');
  playlist = channel.addNewVideo('testvideo4');
  
  test.equal(playlist.playlistLen, 4, 'channel playlist should be 4');
  test.equal(playlist.current, 'testvideo1', 'playlist current video should be "testvideo1"');
  test.equal(playlist.add, 'testvideo4', 'playlist current video should be "testvideo4"');
  test.done();
};

exports['channel - get next video'] = function (test) {
  var playlist;
  channel.resetPlaylist();
  channel.addNewVideo('testvideo1');
  channel.addNewVideo('testvideo2');
  playlist = channel.addNewVideo('testvideo3');
  test.equal(playlist.playlistLen, 3, 'channel playlist should be 3');
  test.ok(playlist.startedAt, "playlist start time should be set");

  playlist = channel.getNextVideo();
  test.equal(playlist.current, 'testvideo2', 'playlist current video should be "testvideo2"');
  test.equal(playlist.play, true, 'playlist should  be playing');

  playlist = channel.getNextVideo();
  test.equal(playlist.current, 'testvideo3', 'playlist current video should be "testvideo3"');
  test.equal(playlist.play, true, 'playlist should  be playing');

  playlist = channel.getNextVideo();
  test.equal(playlist.current, null, 'playlist should be empty');
  test.equal(playlist.startedAt, null, "playlist start time should be set");
  test.equal(playlist.play, null, 'playlist should not be playing');

  test.done();
};

// exports['channel - get current sync time'] = function (test) {
//   var playlist;
//   channel.resetPlaylist();
//   channel.addNewVideo('testvideo1');
//   channel.addNewVideo('testvideo2');
//   channel.addNewVideo('testvideo3');
//   playlist = channel.addNewVideo('testvideo4');
  
//   test.equal(playlist.playlistLen, 4, 'channel playlist should be 4');
//   test.equal(playlist.current, 'testvideo1', 'playlist current video should be "testvideo1"');
//   test.equal(playlist.add, 'testvideo4', 'playlist current video should be "testvideo4"');
//   test.done();
// };