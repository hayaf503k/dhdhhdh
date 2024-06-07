const fs = require("node:fs");

const { REST, Routes } = require('discord.js');

const { clientid } = require('../config.json')

const rest = new REST({ version: '10' }).setToken(process.env.generalp);

module.exports = (client) => {
  const commands = [];

  fs.readdirSync("./SlashCommnds/").forEach(async dir => {
    const commandsFiles = fs.readdirSync(`./SlashCommnds/${dir}`).filter(file => file.endsWith(".js"))
    for (const file of commandsFiles) {
      const command = require(`../SlashCommnds/${dir}/${file}`)
      commands.push(command.data.toJSON())
      client.slashCommands.set(command.data.name, command)
    };
  });

  (async () => {
    try {
      console.log(`⚡ - Started refreshing ${commands.length} application (/) commands.`);
      
      const data = await rest.put(Routes.applicationCommands(clientid), { body : commands })

        console.log(`✅ - Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
      console.log(error)
    };
  })();
};