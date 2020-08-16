function owofy(msg) {
    const client = require("nekos.life");
    const { sfw } = new client();

    let tnt = msg.content.split(' ').slice(1).join(' ');

    async function owo() {
        let owo = await sfw.OwOify({ text: tnt });
        msg.channel.createMessage(owo.msg);
    }
    owo();

}

module.exports = {
    func: owofy,
    aliases: ["owoify", "weebify"],
    help: "Owoify's the text you input",
    usage: "Owoify [ text here ]"
}