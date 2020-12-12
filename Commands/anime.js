async function anime(message, bot) {
    const Mal = require("mal-scraper");
    let client = require("nekos.life");
    let { sfw } = new client();

    let name = message.content.split(' ').slice(1).join(' ');
    if (!name.length) { // Gets the arguments
        return message.channel.createMessage("Input the anime name you want to search");
    }

    let neko = await sfw.neko();
    let id = await message.channel.createMessage({
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

    let data = await Mal.search.search("anime", { term: name }); // Returns an Array of Object

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

    let j = 0; // j Tells Us whether the callback was called or not

    function callback(msg, emoji, userID) {
        if (userID != message.author.id) return; // Denies others reaction
        if (msg.id != id.id) return; // Denies Other reactions, When this point is occured, we make sure that the reaction is issued
        msg.removeReactions();
        if (j) return; // Does not Re-call the Event, This is to Make sure the event is run only once by the desired user
        let num;
        if (reactions.includes(emoji.id)) {
            num = parseInt(emoji.name.split("_")[1]);
        } // Checks whether the Reaction is Right
        j = 1;
        num--
        exe(num);
    }

    async function exe(num) {
        data = await Mal.getInfoFromURL(data[num].url);
        
        file = {
            "content": "Here's the Data you requested",
            "embed": {
                "title": data.title,
                "description": data.synopsis,
                "url": data.url,
                "thumbnail": {
                    "url":data.thumbnail
                },
                "footer": {
                    "text": "Powered by Mal-Scraper"
                },
                "image": {
                    "url": data.picture
                },
                "fields": [
                    {
                        "name": "Type",
                        "value": data.type,
                        "inline": true
                    },
                    {
                        "name": "Episodes",
                        "value": data.episodes,
                        "inline": true
                    },
                    {
                        "name": "Status",
                        "value": data.status,
                        "inline": true
                    },
                    {
                        "name": "Aired",
                        "value": data.aired,
                        "inline": true
                    },
                    {
                        "name": "Producers",
                        "value": data.producers.join(" "),
                        "inline": true
                    },
                    {
                        "name": "Studios",
                        "value": data.studios.join(" "),
                        "inline": true
                    },
                    {
                        "name": "Genre's",
                        "value": data.genres.join("\n"),
                        "inline": true
                    },
                    {
                        "name": "Source",
                        "value": data.source,
                        "inline": true
                    },
                    {
                        "name": "Rating",
                        "value": data.rating,
                        "inline": true
                    },
                    {
                        "name": "Score",
                        "value": data.score,
                        "inline": true
                    }
                ]
            }
        }

        id.edit(file);
        id.removeReactions();
    }

    bot.on("messageReactionAdd", callback); // Event Listener to the Code

    for (i = 0; i < 5; i++) {
        await id.addReaction(`emoji_${i + 1}:${reactions[i]}`);
    } //Adds Reactions to the new message

    setTimeout(function () {
        bot.removeListener("messageReactionAdd", callback); // Closing the Listener
        id.removeReactions();
        if (!j) {
            message.channel.createMessage("Time's Up");
        }
    }, 15000)
}

module.exports = {
    func: anime,
    help: "Gives Info About Anime you Type",
    usage: "Anime [ Anime Name Here ]"
}