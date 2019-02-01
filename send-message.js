module.exports = async (channel, text, duration = 15) => {
  channel.send(text).then(message => {
    if (duration === -1) {
      return;
    }
    setTimeout(() => {
      channel.fetchMessage(message.id).then(message => message.delete());
    }, 1000 * duration);
  });
};
