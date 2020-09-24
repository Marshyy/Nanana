function help(msg, bot) {
    const fs = require('fs');
    let files = fs.readdirSync('./Commands/');
    let prefix = bot.prefix;
    msg.content = msg.content.toLowerCase().split(' ').slice(1).join(' ');

    function charup(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    if (msg.content) {
        let i, j;
        let commands = [];

        for(i=0;i<files.length;i++) {
            let c = require(`../Commands/${files[i]}`);
            commands.push([files[i].slice(0, -3), files[i]]);
            if(c.aliases) {
                for(j=0;j<c.aliases.length;j++) {
                    commands.push([c.aliases[j], files[i]]);
                }
            }
        }

        for(i=0;i<commands.length;i++) {
            if (commands[i][0] == msg.content) break;
        }

        if(i==commands.length) {
            return msg.channel.createMessage("Command not found (Might be a Typo on your side)");
        } else {
            let c = require(`../Commands/${commands[i][1]}`);

            if (!c.usage && !c.help) return msg.channel.createMessage("ERROR\nContact the Bot Owner (user id: 309311003303215108) with a Screenshot");

            if (c.nsfw && !msg.channel.nsfw) return msg.channel.createMessage("Please Use this command in a NSFW Channel");

            let data = {
                "embed": {
                    "author": {
                        "name": bot.user.username,
                        "icon_url": bot.user.avatarURL
                    },
                    "thumbnail": {
                        "url": `https://cdn.discordapp.com/avatars/${bot.user.id}/${bot.user.avatar}.jpg?size=64`
                    },
                    "fields": [
                        { 
                            "name": charup(commands[i][1].slice(0, -3)), 
                            "value": c.help 
                        },
                        { 
                            "name": "Usage", 
                            "value": prefix + c.usage 
                        }
                    ],
                    "footer": {
                        "text": "Text in [] means it's mandatory, <> means optional (without [] or <>)"
                    }
                }
            }

            if (c.aliases) {
                    data.embed.fields.push({ "name": "Aliases", "value": c.aliases.join(', ') });
            }

            msg.channel.createMessage(data);
        }
    } else {
        let data = {
            "embed": {
                "description": "Commands",
                "thumbnail": {
                    "url": `https://cdn.discordapp.com/avatars/${bot.user.id}/${bot.user.avatar}.jpg?size=64`
                },
                "fields": []
            }
        }

        for(i=0;i<files.length;i++) {
            let c = require(`../Commands/${files[i]}`);
            if (c.nsfw && !msg.channel.nsfw) continue;
            if (c.help) {
                data.embed.fields.push({ "name": charup(files[i].slice(0, -3)), "value": c.help , "inline": true});
            }
        }

        msg.channel.createMessage(data);
    }
}

module.exports = {
    func: help,
    help: "Show Help about any commands",
    usage: "Help <Name>"
}
