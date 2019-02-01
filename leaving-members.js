module.exports = client => {
  const channel = global.guild.channels.find("id", "540917906339266561");
  if (channel) {
    client.on("guildMemberRemove", member => {
      channel.send(`${member.displayName} (${member.id}) has left the server`);
    });
  }
};
