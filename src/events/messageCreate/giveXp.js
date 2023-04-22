const { Client, Message } = require("discord.js");
const Level = require("../../schema/level");
const xpToLevel = require("../../utils/xpToLevel");

/**
 *
 * @param {Message} message
 */
function giveXP(message) {
  return Math.floor(message.content.split(" ").length / 2);
}

/**
 *
 * @param {Client} artemis
 * @param {Message} message
 */
module.exports = async (artemis, message) => {
  if (message.author.bot) return;
  const xp = giveXP(message);
  const query = {
    userId: message.author.id,
    guildId: message.guild.id,
  };
  try {
    const level = await Level.findOne(query);
    if (level) {
      level.xp += xp;
      const temp = xpToLevel(level.level);
      if (temp < level.xp) {
        level.xp -= temp;
        level.level++;
        message.channel.send(
          `${message.author} has leveled up to level ${level.level}`
        );
      }
      await level.save().catch((e) => {
        console.log(`${err}`);
        return;
      });
    } else {
      const addLevel = new Level({
        userId: message.author.id,
        guildId: message.guild.id,
        xp: xp,
      });
      await addLevel.save().catch((e) => {
        console.log(`${err}`);
        return;
      });
    }
  } catch (error) {
    console.log(`${error}`);
  }
};
