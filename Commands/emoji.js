function emoji(interaction) {
    emoji = interaction.data.options[0].value;

    if (emoji.startsWith("<a:") && emoji.endsWith(">")) {
        emoji = emoji.slice(emoji.length-19, emoji.length-1);
        interaction.createMessage(`https://cdn.discordapp.com/emojis/${emoji}.gif`);
    } else if (emoji.startsWith("<:") && emoji.endsWith(">")) {
        emoji = emoji.slice(emoji.length-19, emoji.length-1);
        interaction.createMessage(`https://cdn.discordapp.com/emojis/${emoji}.png`);
    } else {
        interaction.createMessage("Invalid emoji");
    }
}

module.exports = {
    name: "emoji",
    description: "Posts the link of the emoji you post",
    type: 1,
    options: [ // Array of Chat Input Options
        {
            type: 3,
            name: "emoji",
            description: "Enter the Emoji you want link off",
            required: 1
        }
    ],
    func: emoji
}