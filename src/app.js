require("dotenv").config();
const { Client, IntentsBitField, Events, Collection } = require("discord.js");
const eventHandler = require("./handlers/eventHandler");
const db = require("mongoose");

const artemis = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

(async () => {
  try {
    db.set("strictQuery", false);
    await db.connect(process.env.MONGOOSE_URI, { keepAlive: true });
    console.log("db connected");
    artemis.commands = new Collection();
    eventHandler(artemis);
    artemis.login(process.env.TOKEN);
  } catch (error) {
    console.log(`${error}`);
  }
})();
