const Eris = require('eris');
const fs = require('fs');
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

let bot = new Eris(token, {
    disableEveryone: true
});

bot.prefix = prefix;

let files = fs.readdirSync('./Commands/');

// Ready Event
bot.on('ready', () => {
  let ready = require("./ready/ready.js");
  ready(bot);
})

// Aliases Loading
let i, j;
let commands = [];
    
for(i=0;i<files.length;i++) {
  let c = require(`./Commands/${files[i]}`);
    commands.push([files[i].slice(0, -3), files[i]]);
      if(c.aliases) {
          for(j=0;j<c.aliases.length;j++) {
          commands.push([c.aliases[j], files[i]]);
        }
    }
}

// Message Create Event, Handling Event 
bot.on('messageCreate', msg => {
  // This is so detrimental, should change I guess
  let handling = require("./ready/handling.js");
  let emoji = require("./ready/emoji.js");
  handling(msg, bot);
  emoji(msg, bot);
  if (msg.content.toLowerCase().startsWith(prefix) && !msg.channel.type) {
    var c = msg.content.toLowerCase().substring(1).split(" ");

    for(i=0;i<commands.length;i++) {
      if (c[0].toString() == commands[i][0]) {
        let command = require(`./Commands/${commands[i][1]}`);
        command.func(msg, bot);

        return;
      }
    }
  }
});

bot.connect();
