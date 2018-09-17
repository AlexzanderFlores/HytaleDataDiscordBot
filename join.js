module.exports = client => {
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

:raised_hand: Raised Hand = Minecraft Beta Tester
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
		message.react('✋')
	  })
	}
	
	try {
	  channel.fetchMessage(id).then(message => {
	    if(message) {
		  message.edit(messageText);
	    }
	  });
	} catch(e) {}
  })
  
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
	  case '✋':
	    roleName = 'Beta Tester'
	    break;
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