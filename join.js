module.exports = client => {
  /*const join = '!join '
  const leave = '!leave '
  const games = {
    'minecraft': 'Minecraft',
	'fortnite': 'Fortnite',
	'overwatch': 'Overwatch',
	'league': 'League of Legends'
  }*/
  
  const channel = client.channels.get('482999713289863178')
  channel.fetchMessages().then(messages => {
	let id
	let count = 0
	for(let message of messages) {
      id = message[0]
	  ++count
	}
	const messageText = `
We have a number of different roles for different games. Adding yourself to these roles will allow you to get community updates on these games as well as join specific channels for those games. You can join and leave as many game-based roles as you'd like.

To join or leave a role simply add or remove a reaction to this message.

:gem:  Diamond Reaction = Minecraft
:bus: Bus Reaction = Fortnite
:gun: Gun Reaction = Overwatch
:bomb: Bomb Reaction = CS:GO

Note: If there is an error try removing and adding the reaction again.
	`
	if(count === 0) {
	  channel.sendMessage(messageText).then(message => {
		message.react('💎')
		message.react('🚌')
		message.react('🔫')
		message.react('💣')
	  })
	}
	
	channel.fetchMessage(id).then(message => message.edit(messageText));
  })
  
  /*client.on('message', message => {
	let content = message.content.toLowerCase()
	const joining = content.startsWith(join)
	const leaving = content.startsWith(leave)
	if(joining || leaving) {
	  if(message.channel.id !== '482728994303639568') {
	    message.delete()
	    return
	  }
	  
	  content = content.replace(join, '').replace(leave, '')
	  if(games[content] === undefined) {
		let gameString = ''
		for(let game of Object.keys(games)) {
		  gameString += `"${game}", `
		}
		gameString = gameString.substring(0, gameString.length - 2)
		message.channel.send(`<@${message.author.id}> That's an unknown game. Please use any of these: ${gameString}.`)
	  } else {
		const role = global.guild.roles.find('name', games[content])
		console.log(content, join, leave)
		try {
		  if(joining) {
			message.member.addRole(role)
		    message.channel.send(`<@${message.author.id}> You've been **added** to the **${games[content]}** role!`)
		  } else if(leaving) {
			message.member.removeRole(role)
		    message.channel.send(`<@${message.author.id}> You've been **removed** from the **${games[content]}** role!`)
		  }
		} catch(e) {console.error(e)}
	  }
	}
  })*/
  
  const handleRole = (emoji, user, add) => {
	if(user.id === '479556852984709121') {
	  return
	}
	
	const member = channel.guild.members.get(user.id)
	if(!member) {
	  return
	}
	let roleName
	
	switch(emoji) {
	  case '💎':
		roleName = 'Minecraft'
		break
	  case '🚌':
		roleName = 'Fortnite'
		break
	  case '🔫':
		roleName = 'Overwatch'
		break
	  case '💣':
		roleName = 'CSGO'
		break
	  default:
	    return
	}
	
	try {
	  const role = global.guild.roles.find('name', roleName)
	  if(add) {
	    member.addRole(role)
	  } else {
	    member.removeRole(role)
	  }
	} catch(e) {}
  }
  
  client.on('messageReactionAdd', (reaction, user) => {
	if(reaction.message.channel.id === '482999713289863178') {
	  handleRole(reaction._emoji.name, user, true)
	}
  })

  client.on('messageReactionRemove', (reaction, user) => {
	if(reaction.message.channel.id === '482999713289863178') {
	  handleRole(reaction._emoji.name, user, false)
	}
  })
}