function extras(msg, bot) {
    let n;
    if (msg.content[2] == "!") { n = 23 } else { n = 22 }

    msg.content = msg.content.slice(n); // Arg = "@mention Text abc" returns "Text abc"

    if (msg.content.split(' ')[0].toLowerCase() == "say") { // Say Section

        msg.content = msg.content.slice(4);

        if (msg.content) {
            msg.channel.createMessage("‎" + msg.content);
        } else {
            msg.channel.createMessage("Why, Just Why??");
        }

    } else { // Emoji Section
        
        let emojis = require("./emojis.json");
        let list = Object.keys(emojis);
        msg.content = msg.content.toLowerCase();

        if (msg.content == "list") {
            return msg.channel.createMessage("List of All Images: " + list.join(" | "))
        }

        if (emojis[msg.content] == undefined) return;

        msg.channel.createMessage({
            embed: {
                image: {
                    url: emojis[msg.content]
                }
            }
        })
    }
}


module.exports = extras;