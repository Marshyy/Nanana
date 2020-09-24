async function number(msg, bot) {
    const NanaAPI = require("nana-api");
    const nana = new NanaAPI();
    let client = require("nekos.life");
    let { sfw } = new client();

    if (!msg.channel.nsfw) return;

    let number = msg.content.split(' ').slice(1);

    let neko = await sfw.neko();

    if (number[0].toLowerCase() == "search") {
        number = number.slice(1).join(" ");

        if (!number.length) return msg.channel.createMessage("Please Input a Valid Text to Search");

        let data = await nana.search(number);

        if (data == "Book not found!") return msg.channel.createMessage("No Search Results!");

        if (data.num_results > 5) {
            data.results = data.results.slice(0, 5);
        }

        msg.channel.createMessage({
            content: "Here are some links regarding the search",
            embed: {
                title: "Links",
                description: data.results.map(function (a, i) { return `${i+1}) [${a.title}](https://nhentai.net/g/${a.id})` }).join("\n"),
                thumbnail: {
                    url: bot.user.avatarURL
                },
                footer: {
                    text: "Powered by Nana API"
                }
            }
        });
    } else {
        number = number[0];

        let id = await msg.channel.createMessage({
            content: "Please Wait Until The Data Loads up, have this neko image until then",
            embed: {
                image: {
                    url: neko.url
                },
                footer: {
                    text: "Powered by nekos.life"
                }
            }
        })

        let data = await nana.g(number);

        if (data == "Book not found!") {
            id.edit({
                content: "Book not found!, please input a valid number",
                embed: {}
            });
        } else {
            id.edit({
                content: `https://nhentai.net/g/${data.id}`,
                embed: {
                    title: data.title.english,
                    url: `https://nhentai.net/g/${data.id}`,
                    image: {
                        url: `https://t.nhentai.net/galleries/${data.media_id}/thumb.jpg`
                    },
                    fields: [
                        {
                            name: "Artist",
                            value: data.tags.filter(a => a.type == "artist").map(a => a.name).join(", "),
                            inline: true
                        },
                        {
                            name: "Language",
                            value: data.tags.find(a => a.type == "language").name,
                            inline: true
                        },
                        {
                            name: "Number of Pages",
                            value: data.num_pages,
                            inline: true
                        },
                        {
                            name: "Tags",
                            value: data.tags.filter(a => a.type == "tag").map(a => a.name).join(", "),
                            inline: false
                        }
                    ],
                    footer: {
                        text: "Powered by Nana API"
                    }
                }
            });
        }
    }
}

module.exports = {
    func: number,
    help: "Posts info about nhentai doujin, has search too",
    usage: "Number [ id ] || +Number search [ tags ]",
    aliases: ["numbah", "n"],
    nsfw: 1
}