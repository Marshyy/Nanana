/* 
   Delete the Part from below if you are running this locally 
*/
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);

/*
   Delete the Part from above if you are running this locally 
*/

const Eris = require('eris');
const fs = require('fs');
const token = process.env.token; // Your Token Goes here
const prefix = process.env.prefix; // Your Prefix Goes here

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
  bot.extras = require("./ready/extras.js");
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

  // The part below is server related, only works in the bot server, You are free to do whatever you want here
  if (msg.mentions.length) {
    if (msg.mentions[0].id == bot.user.id) {
      bot.hand(msg, bot);
      if (msg.guildID === "428255713710702592") bot.extras(msg, bot);
    }
  } else
    if (msg.content.toLowerCase().startsWith(prefix)) {
      var c = msg.content.toLowerCase().substring(prefix.length).split(" ")[0];

      if (commands[c] == undefined) return;
      commands[c](msg, bot);
    }
});

bot.connect();
