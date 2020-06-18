function ready(bot) {
    console.log(`Ready as ${bot.user.username}`);
    console.log(`Ready with ${bot.guilds.size} guilds and ${bot.users.size} users`);
    
    bot.editStatus("online", game = {
        name: `${bot.guilds.size} Guilds | ${bot.users.size} Users | Going thru a funny Rewrite`,
        type: 0
    });
}

module.exports = ready;