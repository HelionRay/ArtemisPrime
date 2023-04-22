module.exports = async (artemis, guildId) => {
    let applicationCommands;
    if (guildId) {
        const guild = await artemis.guilds.fetch(guildId);
        applicationCommands = guild.commands;
    } else {
        applicationCommands = await artemis.application.commands;
    }
    await applicationCommands.fetch();
    return applicationCommands;
};