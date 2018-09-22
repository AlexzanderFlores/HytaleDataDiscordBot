const rp = require('request-promise')

module.exports = (client, address) => {
  client.on('message', message => {
	if(message.channel.id === '491668857011044362' && message.author.id !== '479556852984709121') {
	  const content = message.content
	  const id = message.author.id
	  if(content.indexOf(' ') >= 0) {
		message.channel.send(`<@${id}> Please only post your IGN`)
	  } else {
		const options = {
		  method: 'POST',
		  uri: `http://${address}:8080/whitelist`,
		  body: `${content.toLowerCase()}`,
		}
		
		rp(options).then(data => {
		  if(data !== '') {
			message.channel.send(`<@${id}> ${data}`)
		  }
		}).catch(err => {
		  message.channel.send(`<@${id}> An error occurred, is the network down?`)
		})
	  }
	}
  })
}