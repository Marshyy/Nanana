async function anime(interaction, bot) {
    const Mal = require("mal-scraper");
    const Eris = require('eris');
    interaction.acknowledge(1);

    let name = interaction.data.options[0].value;
    let data = await Mal.search.search("anime", { term: name }); // Returns an Array of Object

    // Checks whether the type of channel is nsfw or not, if not nsfw, deletes the objects which have nsfw data in them
    if (interaction.channel.nsfw == 0) {
        data = data.filter(data => { if (data.rating != "Rx") return data; })
    }

    if (!data.length) { return interaction.createMessage("Cannot find any anime"); }

    // Checks whether the Array of Objects have enough objects to display
    if (data.length > 6) { data = data.slice(0, 5); }
    let url = data.map(x => { return x.url })

    // Follow Up
    let i = 1;
    interaction.createMessage({
        content: "Choose the anime you want details of: ",
        components: [
            {
                type: 1,
                components: [
                    {
                        type: 3,
                        placeholder: "No Option Selected",
                        custom_id: "Anime_Choice",
                        options: data.map(x => { return { label: x.title, value: i++ } })
                    }
                ]
            }
        ]
    })

    bot.once("interactionCreate", (interact) => {
        if (interact instanceof Eris.ComponentInteraction) {
            interact.acknowledge(1);
            Mal.getInfoFromURL(url[interact.data.values[0]-1]).then(ans => {
                file = {
                    "content": "Here's the Data you requested",
                    "embed": {
                        "title": ans.title,
                        "description": ans.synopsis || "No Synopsis Specified",
                        "url": ans.url,
                        "thumbnail": {
                            "url":ans.thumbnail
                        },
                        "footer": {
                            "text": "Powered by Mal-Scraper"
                        },
                        "image": {
                            "url": ans.picture
                        },
                        "fields": [
                            {
                                "name": "Type",
                                "value": ans.type,
                                "inline": true
                            },
                            {
                                "name": "Episodes",
                                "value": ans.episodes || "No Episodes Specifed",
                                "inline": true
                            },
                            {
                                "name": "Status",
                                "value": ans.status || "Status Not Specifed",
                                "inline": true
                            },
                            {
                                "name": "Aired",
                                "value": ans.aired || "No Dates Specified",
                                "inline": true
                            },
                            {
                                "name": "Producers",
                                "value": ans.producers.join(" ") || "No Producers Specifed",
                                "inline": true
                            },
                            {
                                "name": "Studios",
                                "value": ans.studios.join(" ") || "No Studios Specifed",
                                "inline": true
                            },
                            {
                                "name": "Genre's",
                                "value": ans.genres.join("\n") || "No Genre's Specified",
                                "inline": true
                            },
                            {
                                "name": "Source",
                                "value": ans.source || "No Sources Specifed",
                                "inline": true
                            },
                            {
                                "name": "Rating",
                                "value": ans.rating || "None",
                                "inline": true
                            },
                            {
                                "name": "Score",
                                "value": ans.score || "N/A",
                                "inline": true
                            }
                        ]
                    }
                }

                interact.deleteOriginalMessage();
                interact.createMessage(file);
            })
        }
    })
}

module.exports = {
    name: "anime",
    description: "Gives Info About Anime you Type",
    type: 1,
    options: [ // Array of Chat Input Options
        {
            type: 3,
            name: "anime",
            description: "Enter the name of the Anime",
            required: 1
        }
    ],
    func: anime
}