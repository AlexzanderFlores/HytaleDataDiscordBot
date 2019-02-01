module.exports = client => {
  // for (let emoji of client.emojis) {
  //   console.log(emoji[0], emoji[1].name)
  // }

  const host = client.emojis.find(emoji => emoji.name === "servericon");
  const marketplace = client.emojis.find(
    emoji => emoji.name === "marketplaceicon"
  );
  const vote = client.emojis.find(emoji => emoji.name === "voteicon");
  const discord = client.emojis.find(emoji => emoji.name === "discordicon");

  const emojis = [host.id, vote.id, marketplace.id, discord.id];

  const channel = client.channels.get("539879987637911572");
  if (!channel) {
    return;
  }
  channel.fetchMessages().then(messages => {
    let id;
    let count = 0;
    for (let message of messages) {
      id = message[0];
      ++count;
    }
    const messageText = `
Please select any roles that best describe your Hytale projects.

:video_game: = Server Owner

${host} = Hosting Company

${marketplace} = Marketplace Website

${vote} = Listing/Voting Website

${discord} = Forum/Discord Community

If there is an error try removing and adding the reaction again.
	`;
    if (count === 0) {
      channel.sendMessage(messageText).then(message => {
        message.react("🎮");
        for (let emoji of emojis) {
          message.react(emoji);
        }
      });
    }

    try {
      channel.fetchMessage(id).then(message => {
        if (message) {
          message.edit(messageText);
        }
      });
    } catch (e) {}
  });

  const handleRole = (emoji, user, add) => {
    // Ignore the bot
    if (user.id === "537963632927965206") {
      return;
    }

    const member = channel.guild.members.get(user.id);
    if (!member) {
      return;
    }
    let roleName;

    switch (emoji) {
      case "🎮":
        roleName = "Server Owner";
        break;
      case "servericon":
        roleName = "Server Host";
        break;
      case "marketplaceicon":
        roleName = "Marketplace Owner";
        break;
      case "voteicon":
        roleName = "Voting Website Owner";
        break;
      case "discordicon":
        roleName = "Community Owner";
        break;
      default:
        return;
    }

    try {
      const role = global.guild.roles.find("name", roleName);
      if (add) {
        member.addRole(role);
      } else {
        member.removeRole(role);
      }
    } catch (e) {}
  };

  client.on("messageReactionAdd", (reaction, user) => {
    if (reaction.message.channel.id === "539879987637911572") {
      handleRole(reaction._emoji.name, user, true);
    }
  });

  client.on("messageReactionRemove", (reaction, user) => {
    if (reaction.message.channel.id === "539879987637911572") {
      handleRole(reaction._emoji.name, user, false);
    }
  });
};
