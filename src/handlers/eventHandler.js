const path = require("path");
const getAllFiles = require("../utils/getAllFiles");

module.exports = (artemis) => {
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b);
    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();
    artemis.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        const eventFuntion = require(eventFile);
        await eventFuntion(artemis, arg);
      }
    });
  }
};
