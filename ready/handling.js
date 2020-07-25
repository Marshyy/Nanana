function hand(msg, bot) {
  let prefix = bot.prefix;

  if (msg.content[2] == "!") {
    if (msg.content == `<@!${bot.user.id}>` || msg.content.toLowerCase() == `<@!${bot.user.id}> prefix`) {
      return msg.channel.createMessage(`My Prefix is "${prefix}"`);
    }
  } else {
    if (msg.content == `<@${bot.user.id}>` || msg.content.toLowerCase() == `<@${bot.user.id}> prefix`) {
      return msg.channel.createMessage(`My Prefix is "${prefix}"`);
    }
  }
}

module.exports = hand;