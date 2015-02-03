// * Can add a channel to its list if it doesn't already exist
var channels = {},
  channel_users = {},
  channelCount = 0,
  channelUserCount = {};

exports.addChannel = function (channelName) {
  if (!exports.findChannel(channelName)) {
    channels[channelName] = true;
    channel_users[channelName] = {};
    channelUserCount[channelName] = 0;
    channelCount++;
  }
  return { channelAdded: channelName, channelCount: channelCount };
};

exports.addUserToChannel = function (channelName, clientId) {
  channel_users[channelName] = {};
  channel_users[channelName][clientId] = true;
  channelUserCount[channelName]++;
  return { channel: channelName, userAdded: clientId, userCount: channelUserCount[channelName] };
};

// * Can remove a channel to its list if it doesn't already exist
exports.removeChannel = function (channelName) {
  if (!exports.findChannel(channelName)) { return; }
  delete channels[channelName];
  delete channel_users[channelName];
  delete channelUserCount[channelName];
  channelCount--;
};

// * Can check to see if a given channel exists 
exports.findChannel = function (channelName) {
  return (channels[channelName] ? true : null);
};

exports.getAllChannels = function () {
  return { channels: channels, channelCount: channelCount };
};

exports.getChannelUsers = function (channelName) {
  return { users: channel_users[channelName], userCount: channelUserCount[channelName] || 0 };
};

exports.resetDirectory = function () {
  channels = {};
  channel_users = {};
  channelCount = 0;
  channelUserCount = {};
};