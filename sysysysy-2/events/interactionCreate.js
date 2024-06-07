const { Events, TextInputBuilder, ModalBuilder, TextInputStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = require("../index.js")
const ms = require("ms");
const db = require('pro.db')
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.slashCommands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
     if (command.cooldown) {
        let cooldown = command.cooldown;
        
        let lastExec = await db.fetch(`${command.name}_${interaction.user.id}`);
        
        if (lastExec !== null && cooldown - (Date.now() - lastExec) > 0) {
          let timeObj = ms(cooldown - (Date.now() - lastExec));
        
         return interaction.reply({content:`**You Can Use This Command After ${timeObj}**`}) 
        } else {
          db.set(`${command.name}_${interaction.user.id}`, Date.now())
        } 
        } 
        await command.execute(interaction, client);
    } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
    }
})
