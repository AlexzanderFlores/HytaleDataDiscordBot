const mute = require("./mute");
const sendMessage = require("./send-message");

let counters = {};
let warnings = {};

const clearCounters = () => {
  counters = {};
  setTimeout(clearCounters, 1000 * 5);
};

const clearWarnings = () => {
  warnings = {};
  setTimeout(clearWarnings, 1000 * 60 * 2);
};

module.exports = client => {
  clearCounters();
  clearWarnings();

  client.on("message", message => {
	if(!message.member) {
	  return;
	}
	
    const name = message.author.username;
    if (!counters[name]) {
      counters[name] = 0;
    }

    if (++counters[name] >= 4) {
      message.delete();

      counters[name] = 0;
      if (!warnings[name]) {
        warnings[name] = 0;
      }

      if (++warnings[name] >= 2) {
        mute(message.member);
        delete counters[name];
        delete warnings[name];
        sendMessage(
          message.channel,
          `<@${
            message.author.id
          }> You have been permanently muted for spamming. If you believe this was a mistake please contact <@251120969320497152>`, // customer support: https://hytaledata.com/support`
          -1
        );
        return;
      }

      mute(message.member, 20);
      sendMessage(
        message.channel,
        `<@${
          message.author.id
        }> Please do not send messages so quickly. You have been temporarily muted.`
      );
    }
  });
};
