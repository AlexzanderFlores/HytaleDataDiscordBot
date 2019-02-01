module.exports = (member, duration) => {
  if(!member) {
	return;
  }
  console.log(`Muting ${member.user.username}`);
  const role = global.guild.roles.find("name", "Muted");
  try {
    member.addRole(role);

    if (duration) {
      setTimeout(() => {
        console.log(`Unmuting ${member.user.username}`);
        member.removeRole(role);
      }, 1000 * duration);
    }
  } catch (e) {
    console.error(e);
  }
};
