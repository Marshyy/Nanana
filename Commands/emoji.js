function emoji(msg) {
    var emoji = msg.content.trim().split(" ").reverse();
        emoji.pop();
    if (emoji[0] == undefined) {
        msg.channel.createMessage("Please input a emoji for the command");
        return;
    }

    emoji = emoji[0].toString();

    if (emoji.startsWith("<a:") && emoji.endsWith(">")) {
        emoji = emoji.slice(emoji.length-19, emoji.length-1);
        msg.channel.createMessage(`https://cdn.discordapp.com/emojis/${emoji}.gif`);
    } else if (emoji.startsWith("<:") && emoji.endsWith(">")) {
        emoji = emoji.slice(emoji.length-19, emoji.length-1);
        msg.channel.createMessage(`https://cdn.discordapp.com/emojis/${emoji}.png`);
    } else {
        msg.channel.createMessage("Invalid emoji");
    }
}

module.exports = {
    func: emoji,
    help: "Posts the link of the emoji you post",
    usage: "Emoji [ emoji here ]"
}