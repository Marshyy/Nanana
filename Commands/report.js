function report(msg) {
  
  const data = {
    "embed": {
      "image": {
        "url": "https://cdn.discordapp.com/attachments/429649382514884629/441268456629993480/callingmods.png"
      }
    }
  }

  msg.channel.createMessage(data);
}

module.exports = {
  func: report,
  help: "Calls the Mods",
  usage: "Report"
}