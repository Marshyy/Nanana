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
    }
}


module.exports = extras;