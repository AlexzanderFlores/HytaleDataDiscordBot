module.exports = client => {
  client.on("message", message => {
    if (
      (message.channel.id === "540739435801739264" ||
        message.channel.id === "539767629896744960") &&
      message.member.id === "251120969320497152" &&
      message.content === "!!cc"
    ) {
      (async () => {
        message.delete();
        const fetched = await message.channel.fetchMessages({ limit: 99 });
        message.channel.bulkDelete(fetched);
      })();
    }
  });
};
