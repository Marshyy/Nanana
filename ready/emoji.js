function emoji(msg, bot) {
    if (msg.content.toLowerCase() == `<@!${bot.user.id}> cirno` && msg.author.id === "309311003303215108") {
        msg.delete();
        return msg.channel.createMessage({
            embed: {
                image: {
                    url: "https://cdn.discordapp.com/emojis/390299775599247367.png"
                }
            }
        })
    }
}

module.exports = emoji;