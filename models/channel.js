var playlist = [],
  currentStartedAt = null,
  currentVideoId = null;

exports.getPlaylist = function() {
  var response = {};
  response.playlist = playlist;
  response.playlistLen = playlist.length;
  response.current = currentVideoId;
  return response;
}


// Channel should be able to add new video to playlist
exports.addNewVideo = function(videoId) {
  var response = {};
  playlist.push(videoId);
  if (playlist.length === 1) { 
    currentVideoId = playlist[0]; 
    currentStartedAt = +new Date();
    response.play = true;
  }
  response.startedAt = currentStartedAt;
  response.current = currentVideoId;
  response.add = videoId;
  response.playlistLen = playlist.length;
  return response;
}

exports.resetPlaylist = function() {
  playlist = [];
  currentStartedAt = null;
  currentVideoId = null;
}



// Channel should be able to get current seek time
exports.getCurrentSeekTime = function () {
  var response = {};
  if (currentStartedAt === null) {
    response.current = currentVideoId;
    response.sync = null;
  } else {
    response.current = currentVideoId;
    response.sync = (+new Date() - currentStartedAt);
  }
  return response;
};

// Channel should be able to get next video
exports.getNextVideo = function() {
  var response = {};
  playlist.shift();
  if (!playlist.length) { 
    currentVideoId = null; 
    currentStartedAt = null; 
    response.current = null;
  }
  else { 
    currentStartedAt = +new Date();
    response.startedAt = currentStartedAt;
    response.current = playlist[0]; 
    response.play = true;
  }
  return response;
}