function owofy(msg) {
    const client = require("nekos.life");
    const { sfw } = new client();

    let tnt = msg.content.split(' ').slice(1).join(' ');

    if (tnt) {
        sfw.OwOify({text: tnt}).then(weebmsg => {
            msg.channel.createMessage(weebmsg.owo);
        });
    } else {
        return msg.channel.createMessage("Please input valid text to Weebify");
    }
}

module.exports = {
    func: owofy,
    aliases: ["owoify", "weebify"],
    help: "Owoify's the text you input",
    usage: "Owoify [ text here ]"
}