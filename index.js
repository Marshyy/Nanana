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

let bot = new Eris.CommandClient(token, { allowedMentions: { everyone: false } }, { 
  defaultHelpCommand: false,
  ignoreBots: true,
  ignoreSelf: true,
  name: "Nanana",
  owner: "Marshyy",
  prefix: "@mention "
});

// Ready Event
bot.on('ready', async () => {
  console.log(`Ready as ${bot.user.username}`);
  console.log(`Ready with ${bot.guilds.size} guilds`);
  quotes = ["I won’t lose to my own decisions, no matter what. That’s the proof that I’m me.", "Everyone wants to have someone else's attention, and to be noticed. But the same thing goes for the other person too.", "Happiness is only happiness when everyone shares it."]
  random = Math.floor(Math.random() * quotes.length);  

  bot.editStatus("online", {
    name: `${bot.guilds.size} Guilds |  ${quotes[random]}`,
    type: 3
  });

  // Aliases and Commands Loading
  let i, files = fs.readdirSync('./Commands/');
  let commands = await bot.getCommands();

  if (commands.length == files.length) { 
    // If Command is updated but nothing new is added, This won't update it, but that doesn't matter for the time being tho
    for (i = 0; i < files.length; i++) {
      let c = require(`./Commands/${files[i]}`);
      bot.createCommand(c, c.type);
    }
  }
})

bot.on("error", err => console.error(err))

bot.on("interactionCreate", (interaction) => {
  if (interaction instanceof Eris.CommandInteraction) {
    let c = require(`./Commands/${interaction.data.name}.js`);
    c.func(interaction, bot);
  }
})

bot.connect();