function owofy(msg) {
    const client = require("nekos.life");
    const { sfw } = new client();

    let tnt = msg.content.split(' ').slice(1).join(' ');

    if (tnt.length) {
        async function owo() {
            let owo = await sfw.OwOify({ text: tnt });
            console.log(owo);
            msg.channel.createMessage(owo.owo);
        }
        owo();
    } else {
        msg.channel.createMessage("Ahhh???, Type Something after the command I guess, idk...")
    }
}

module.exports = {
    func: owofy,
    aliases: ["owoify", "weebify"],
    help: "Owoify's the text you input",
    usage: "Owoify [ text here ]"
}