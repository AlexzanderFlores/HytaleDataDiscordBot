const mute = require('./mute')

let counters = {}
let warnings = {}

const clearCounters = () => {
  counters = {}
  setTimeout(clearCounters, 1000 * 5)
}

const clearWarnings = () => {
  warnings = {}
  setTimeout(clearWarnings, 1000 * 10)
}

module.exports = client => {
  clearCounters()
  clearWarnings()
  
  client.on('message', message => {
	const name = message.author.username
	if(!counters[name]) {
	  counters[name] = 0
	}
	
	if(++counters[name] >= 4) {
	  counters[name] = 0
	  if(!warnings[name]) {
		warnings[name] = 0
	  }
	  if(++warnings[name] >= 2) {
		mute(message.member)
	  }
      message.channel.send(`<@${message.author.id}> Please do not send messages so quickly.`)
	}
  })
}