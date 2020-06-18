function neko(msg) {
    const client = require('nekos.life');
    const { sfw } = new client();

    sfw.neko().then(url => {
        const u = url.url;

        const data = {
            "embed": {
                "title": "Click for url",
                "url": u, 
                "image": {
                    "url": u
                  }
            }
        };
        
        msg.channel.createMessage(data);
    })
}

module.exports = {
    func: neko,
    help: "Posts an Random Image of a Neko",
    usage: "Neko"
}