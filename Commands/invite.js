function invite(interaction, bot) {
    interaction.createMessage(`Invite link for bot is: https://discord.com/oauth2/authorize?client_id=${bot.user.id}&permissions=67497040&scope=bot`);
}

module.exports = {
    name: "invite",
    description: "Posts the invite link to the bot",
    type: 1,
    func: invite
}