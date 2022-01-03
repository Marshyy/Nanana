function neko(interaction) {
    const client = require('nekos.life');
    const neko = new client();
    
    neko.sfw.neko().then(u => {
        let data = {
            "embed": {
                "title": "Click for url",
                "url": u.url, 
                "image": {
                    "url": u.url
                },
                "footer": {
                    "text": "Powered by Nekos.life"
                }
            }
        }
    
        interaction.createMessage(data);
    })
}

module.exports = {
    name: "neko",
    description: "Posts an Random Image of a Neko",
    type: 1,
    func: neko
}