function owoify(interaction) {
    const client = require("nekos.life");
    const { sfw } = new client();

    sfw.OwOify({ text: interaction.data.options[0].value }).then(val => {
        interaction.createMessage(val.owo);
    });
}

module.exports = {
    name: "owoify",
    description: "Owoify's the text you input",
    type: 1,
    options: [ // Array of Chat Input Options
        {
            type: 3,
            name: "text",
            description: "Enter the text you want to make it weird",
            required: 1
        }
    ],
    func: owoify
}