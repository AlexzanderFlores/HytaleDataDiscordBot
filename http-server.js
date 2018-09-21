const express = require('express')
const http = require('http')
const app = express()

module.exports = client => {
  app.get('/confirm-minecraft', (req, res) => {
	res.end()
	
	const discordId = req.query.d
	
	if(discordId) {
	  const channel = client.channels.get('490258350131380226')
	  if(channel) {
		channel.send(`<@${discordId}> Your Minecraft account has been linked!`)
	  }
	}
  })
  
  app.post('/change-rank', (req, res) => {
	res.end()
	  
	const discordId = req.query.d
	let rank = req.query.r.toUpperCase()
	
	if(rank === 'VIP_PLUS') {
	  rank = 'VIP+'
	} else if(rank === 'VIP') {
	  rank = 'VIP'
	} else {
	  return
	}
	
	const user = global.guild.members.get(discordId)
	
    if(user) {
	  try {
	    const role = global.guild.roles.find('name', rank)
	    user.addRole(role)
		console.log(`Set ${user.nickname} as ${rank}`)
	  } catch(e) {}
    }
  })
  
  app.post('/recent-customer', (req, res) => {
	res.end()
	
	const name = req.query.n
	let product = req.query.p
	
	switch(product) {
	  case 'PRO':
		product = 'Pro'
		break;
	  
	  case 'PRO_PLUS':
		product = 'Pro+'
		break;
	  
	  default:
	    return;
	}
	
	const channel = client.channels.get('491035296381534208')
	if(channel) {
	  channel.send(`${name} has purchased ${product}. Thank you very much for your support!`)
	}
  })
  
  let lastMessage = ''
  
  app.post('/reports', (req, res) => {
	res.end()
	
	const amount = req.query.a
	
	const channel = client.channels.get('492521529158926365')
	if(channel) {
	  if(amount == 0) {
		message = 'All open reports on have been closed.'
	  } else {
		message = `There ${amount == 1 ? 'is' : 'are'} ${amount} open report${amount == 1 ? '' : 's'}.\n**React to this if you intend on answering these reports.**`
	  }
	  
	  if(message !== lastMessage) {
		channel.send(message)
		lastMessage = message
	  }
	}
  })
  
  http.createServer(app).listen(8081)
}