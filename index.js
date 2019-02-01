const Discord = require("discord.js");
const client = new Discord.Client();
const rp = require("request-promise");
const chat = require("./chat");
const spam = require("./spam");
const roleClaim = require("./role-claim");
const clearChat = require("./clear-chat");
const leavingMembers = require("./leaving-members");
const httpServer = require("./http-server");

const updateMemberCount = () => {
  const channel = global.guild.channels.find("id", "537977939292192778");
  if (channel) {
    channel.setName(`Discord Members: ${global.guild.memberCount}`);
  }
};

const updateBetaTesters = async () => {
  const channel = global.guild.channels.find("id", "539691996344745984");
  if (channel) {
    await rp
      .get("https://api.hytaledata.com/dev/count-beta-testers")
      .then(count => channel.setName(`Beta Testers: ${count}`))
      .catch(console.error);
  }

  setTimeout(updateBetaTesters, 1000 * 30);
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  global.guild = client.guilds.find("id", "532435127012163585");
  chat(client);
  spam(client);
  roleClaim(client);
  clearChat(client);
  leavingMembers(client);
  httpServer(client);
  updateMemberCount();
  updateBetaTesters();
  client.user.setPresence({
    game: { name: `HytaleData.com`, type: 0 }
  });
});

client.on("guildMemberAdd", member => {
  const channel = global.guild.channels.find("id", "537978588331376661");
  if (channel) {
    setTimeout(() => {
      channel.send(
        `Welcome to Hytale Data, ${member}! Be sure to signup for the free beta testing at https://hytaledata.com/beta-testing`
      );
      updateMemberCount();
    }, 1000);
  }
});

client.on("guildMemberRemove", () => {
  setTimeout(() => {
    updateMemberCount();
  }, 1000);
});

client.login(require("./token.json").token);
