function images(interaction) {
    if (interaction.data.options[0].value == "report") {
        const data = {
            "embed": {
                "image": {
                    "url": "https://cdn.discordapp.com/attachments/429649382514884629/441268456629993480/callingmods.png"
                }
            }
        }
    
        interaction.createMessage(data)
    }
}

module.exports = {
    name: "images",
    description: "Posts Images in the Channel",
    type: 1,
    options: [ // Array of Chat Input Options
        {
            type: 3,
            name: "choice",
            description: "Enter the Image you want to see",
            required: 1,
            choices: [
                {
                    name: "Call the mods",
                    value: "report"
                }
            ]
        }
    ],
    func: images
}