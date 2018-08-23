const words = require('./words')
const mute = require('./mute')

let warnings = {}

const clearWarnings = () => {
  warnings = {}
  setTimeout(clearWarnings, 1000 * 60 * 2)
}

const contains = (content, word) => {
  return content === word || content.startsWith(`${word} `) || content.endsWith(` ${word}`) || content.indexOf(` ${word} `) >= 0
}

const deleteMessage = message => message.delete()

module.exports = client => {
  clearWarnings()
  client.on('message', message => {
	const name = message.author.username
	let content = message.content.toLowerCase()
	
	if(new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(content)) {
	  if(content.indexOf('discord.gg/') >= 0) {
		deleteMessage(message)
		
		if(!warnings[name]) {
		  warnings[name] = 0
		}
		
		if(++warnings[name] >= 2) {
		  mute(message.member)
		} else {
		  message.channel.send(`<@${message.author.id}> Please do not advertise Discord servers.`)
		}
	  }
	}
	
	content = content.replace('@', 'a').replace(/[^a-zA-Z0-9 +]/g, '')
	content = content.replace('3', 'e')
	
	for(let word of words.words) {
	  if(contains(content, word)) {
		console.log(`"${word}" in "${content}" by ${name}`)
		deleteMessage(message)
		return
	  }
	  for(let extension of words.extensions) {
		extension = word + extension
		if(contains(content, extension)) {
		  console.log(`"${extension}" in "${content}" by ${name}`)
		  deleteMessage(message)
		  return
	    }
	  }
	}
  })
}