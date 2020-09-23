function emoji(msg, bot) {
    let n;
    if (msg.content[2] == "!") { n = 23 } else { n = 22 }
    let name = msg.content.toLowerCase().slice(n);
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