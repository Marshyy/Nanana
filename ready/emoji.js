function emoji(msg, bot) {
    let name = msg.content.toLowerCase().slice(23);
    let emojis = require("./emojis.json");
    let list = Object.keys(emojis);

    if (name == "list") {
        return msg.channel.createMessage("List of All Images: " + list.join(" || "))
    }

    if (emojis[name] == undefined) return;

    msg.channel.createMessage({
        embed: {
            image: {
                url: emojis[name]
            }
        }
    })
}


module.exports = emoji;