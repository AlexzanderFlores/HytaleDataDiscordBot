module.exports = client => {
  const join = '!join '
  const leave = '!leave '
  const games = {
    'minecraft': 'Minecraft',
    'fortnite': 'Fortnite',
    'overwatch': 'Overwatch',
    'league': 'League of Legends'
  }
  
  client.on('message', message => {
    let content = message.content.toLowerCase()
    const joining = content.startsWith(join)
    const leaving = content.startsWith(leave)
    if(joining || leaving) {
      if(message.channel.id !== '482728994303639568') {
        message.delete()
        return
      }
      
      content = content.replace(join, '').replace(leave, '')
      console.log(content)
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
    console.log(message.channel.id)
  })
}