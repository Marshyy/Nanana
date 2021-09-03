function ready(bot) {
    console.log(`Ready as ${bot.user.username}`);
    console.log(`Ready with ${bot.guilds.size} guilds`);
    
    bot.editStatus("online", game = {
        name: `${bot.guilds.size} Guilds | Happiness is only happiness when everyone shares it.`,
        type: 3
    });
}

module.exports = ready;