const Discord = require('discord.js')
const client = new Discord.Client()
const chat = require('./chat')
const spam = require('./spam')

const updateMemberCount = () => {
  client.user.setPresence({ game: { name: `Member Goal ${global.guild.memberCount}/500`, type: 0 } })
  setTimeout(updateMemberCount, 1000 * 30)
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  global.guild = client.guilds.find('id', '479007599187197974')
  chat(client)
  spam(client)
  updateMemberCount()
})

client.on('guildMemberAdd', member => {
  const channel = global.guild.channels.find('id', '479208327063011356')
  if(channel) {
	const rules = global.guild.channels.get('479205937282809856').toString()
	const announcements = global.guild.channels.get('479007960001937421').toString()
	const faq = global.guild.channels.get('479888973205078016').toString()
	setTimeout(() => {
	  channel.send(`Welcome to the official ProMcGames Discord server, ${member}! You are member #${guild.memberCount}! Be sure to read the ${rules}. Check ${announcements} and ${faq} for news on ProMc!`)
	}, 1000)
  }
})

client.on('message', message => {
  if(message.content.toLowerCase() === '!createchannel') {
	const name = `${message.author.username}'s Channel`
	const channel = client.channels.find('name', name)
	if(!channel) {
	  message.guild.createChannel(name, 'voice').then(channel => {
	    channel.setParent('479566452727480340')
		message.guild.fetchMember(message.author).then(member => {
		  member.setVoiceChannel(channel)
		})
		
		/*setTimeout(() => {
		  console.log(channel.members.length)
		}, 1000 * 30)*/
	  })
    }
  }
})

client.on('voiceStateUpdate', member => {
  if(member.voiceChannelID) {
    const channel = client.channels.find('id', member.voiceChannelID)
    if(channel) {
      //console.log(channel)
    }
  }
})

client.on('message', message => {
  if(message.content.toLowerCase() === '!membercount') {
    message.channel.send(`Our Discord currently has **${global.guild.memberCount}** members!`)
  }
})

client.login(require('./token.json').token)