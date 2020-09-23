const Eris = require('eris');
const fs = require('fs');
const token = "Insert your Token Here";
const prefix = "Insert your Prefix here";

let bot = new Eris(token, {
  disableEveryone: true
});

bot.prefix = prefix;

let files = fs.readdirSync('./Commands/');

// Ready Event
bot.on('ready', () => {
  let ready = require("./ready/ready.js");
  ready(bot);
  bot.hand = require("./ready/handling.js");
  bot.emoji = require("./ready/emoji.js");
})

// Aliases and Commands Loading
let i, j;
let commands = {}; // Object Created to Store Name And Aliases And their respective funtions

for (i = 0; i < files.length; i++) {
  let c = require(`./Commands/${files[i]}`);

  commands[files[i].slice(0, -3).toLowerCase()] = c.func;

  if (c.aliases) {
    for (j = 0; j < c.aliases.length; j++) {
      commands[c.aliases[j].toLowerCase()] = commands[files[i].slice(0, -3).toLowerCase()];
    }
  }
}

// Message Create Event, Handling Event 
bot.on('messageCreate', msg => {
  if (msg.channel.type) return; // Only Works in News Channel and Text Channels

  if (msg.mentions.length) {
    if (msg.mentions[0].id == bot.user.id) {
      bot.hand(msg, bot);
      if (msg.guildID === "428255713710702592") bot.emoji(msg, bot);
    }
  } else
    if (msg.content.toLowerCase().startsWith(prefix)) {
      var c = msg.content.toLowerCase().substring(prefix.length).split(" ")[0];

      if (commands[c] == undefined) return;
      commands[c](msg, bot);
    }
});

bot.connect();
