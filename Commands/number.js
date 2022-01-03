async function number(interaction) {
    const NanaAPI = require("nana-api");
    const nana = new NanaAPI();

    if (interaction.channel.nsfw != 1) {
        return interaction.createMessage("Use this Command in an NSFW Channel.");
    }

    let number = interaction.data.options[0].value;
    let data = await nana.g(number);

    if (data == "Book not found!") {
        interaction.createMessage("Book not found!, please input a valid number");
    } else {
        interaction.createMessage({
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

module.exports = {
    name: "number",
    description: "Posts info about nhentai doujin",
    type: 1,
    options: [ // Array of Chat Input Options
        {
            type: 4,
            name: "number",
            description: "Enter the number of the doujin in NHentai",
            required: 1
        }
    ],
    func: number
}