function invite(msg, bot) {
    msg.channel.createMessage(`Invite link for bot is: https://discord.com/oauth2/authorize?client_id=${bot.user.id}&permissions=67497040&scope=bot`);
}

module.exports = {
    func: invite,
    help: "Posts the invite link to the bot",
    usage: "invite"
}