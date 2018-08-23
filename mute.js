module.exports = member => {
  console.log(`Muting ${member.username}`)
  const role = global.guild.roles.find('name', 'Muted')
  console.log(role)
  try {
	member.addRole(role)
  } catch(e) {console.error(e)}
}