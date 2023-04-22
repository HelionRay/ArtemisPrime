module.exports = {
  name: "ping",
  description: "pong",
  devOnly: false,
  testOnly: false,
  callback: (artemis, interaction) => {
    const pong = artemis.ws.ping;
    interaction.reply("Pong! " + pong + "ms");
  },
};
