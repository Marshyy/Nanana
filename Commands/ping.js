function ping(msg) {
    msg.channel.createMessage("You don't see this").then(m => {
        let t = m.timestamp - msg.timestamp;
        m.edit(`Total Time taken to react is ${t} msecs`);
    });
}

module.exports = {
    func: ping,
    aliases: ["pong"],
    help: "Shows a ping/pong message",
    usage: "Ping"
}