function anime(message, bot) {
    const Mal = require("mal-scraper");
    let name = message.content.split(' ').slice(1).join(' ');
    if (!message.content.split(' ').slice(1).join(' ')) { // Gets the arguments
        return message.channel.createMessage("Input the anime name you want to search");
    }

    let client = require("nekos.life");
    let { sfw } = new client();
    let neko, id;
    async function test() {
        neko = await sfw.neko();
        id = await message.channel.createMessage({
            content: "Please Wait Until The Date Loads up, have this neko image until then",
            embed: {
                image: {
                    url: neko.url
                },
                footer: {
                    text: "Powered by nekos.life"
                }
            }
        })
    }
    test();

    Mal.search.search("anime", { term: name }).then(data => { 
        // Essetially returns an Array of Object, maxResults property doesn't work
        // Checks whether the type of channel is nsfw or not, if not nsfw, deletes the objects which have nsfw data in them
        
        if (message.channel.nsfw == 0) {
            data = data.filter(data => { if (data.rating != "Rx") return data; })
        }

        if (!data.length) { return message.channel.createMessage("Cannot find any anime"); }

        // Checks whether the Array of Objects have enough objects to display
        if (data.length > 6) { data = data.slice(0, 5); }

        // Maps the titles to show the inital Message
        let i = 1;
        let titles = data.map(x => i++ + ") " + x.title).join("\n");

        //All the reactions used in the message object
        let reactions = ["683725890710143013", "683725927389462530", "683725971756679186", "683725993348694118", "683726017663205379"];

        let file = {
            "content": "Pick Your Poison",
            "embed": {
                "title": "React to the Following Numbers to get your Data",
                "description": titles,
                "footer": {
                    "text": "Powered by mal-scraper and nekos.life"
                },
                "thumbnail": {
                    "url": neko.url
                },
                "image": {
                    "url": undefined
                }
            }
        }
        id.edit(file);

        for (i = 0; i < 5; i++) { 
            id.addReaction(`emoji_${i + 1}:${reactions[i]}`); 
        } //Adds Reactions to the new message

        let j = 0; // j Tells Us whether the callback was called or not
        let num; // The Number used to get the required data

        // Callback code
        let callback = (msg, emoji, userID) => {
            if (userID != message.author.id) return; // Denies others reaction
            if (msg.id != id.id) return; // Denies Other reactions, When this point is occured, we make sure that the reaction is issued
            msg.removeReactions();
            if (j) return; // Does not Re-call the Event, This is to Make sure the event is run only once by the desired user
            if (reactions.includes(emoji.id)) { 
                num = parseInt(emoji.name.split("_")[1]); 
            } // Checks whether the Reaction is Right
            j = 1;
            exe();
        }

        // Event Listener for the Code
        bot.on("messageReactionAdd", callback);

        function exe() {
            num--;
            Mal.getInfoFromURL(data[num].url).then(ndata => {
                file = {
                    "content": "Here's the Data you requested",
                    "embed": {
                        "title": data[num].title,
                        "description": ndata.synopsis,
                        "url": data[num].url,
                        "thumbnail": {
                            "url": data[num].thumbnail
                        },
                        "footer": {
                            "text": "Powered by Mal-Scraper"
                        },
                        "image": {
                            "url": ndata.picture
                        },
                        "fields": [
                            {
                                "name": "Type",
                                "value": ndata.type,
                                "inline": true
                            },
                            {
                                "name": "Episodes",
                                "value": ndata.episodes,
                                "inline": true
                            },
                            {
                                "name": "Status",
                                "value": ndata.status,
                                "inline": true
                            },
                            {
                                "name": "Aired",
                                "value": ndata.aired,
                                "inline": true
                            },
                            {
                                "name": "Producers",
                                "value": ndata.producers.join(" "),
                                "inline": true
                            },
                            {
                                "name": "Studios",
                                "value": ndata.studios.join(" "),
                                "inline": true
                            },
                            {
                                "name": "Genre's",
                                "value": ndata.genres.join("\n"),
                                "inline": true
                            },
                            {
                                "name": "Source",
                                "value": ndata.source,
                                "inline": true
                            },
                            {
                                "name": "Rating",
                                "value": ndata.rating,
                                "inline": true
                            },
                            {
                                "name": "Score",
                                "value": ndata.score,
                                "inline": true
                            }
                        ]
                    }
                }

                id.edit(file);
                id.removeReactions();
            }); 
        }

        setTimeout(function () {
            bot.removeListener("messageReactionAdd", callback); // Closing the Listener
            if (!j) {
                message.channel.createMessage("Time's Up");
            }
        }, 15000);
    })
}

module.exports = {
    func: anime,
    help: "Gives Info About Anime you Type",
    usage: "Anime [ Anime Name Here ]"
}