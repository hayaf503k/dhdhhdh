const { SlashCommandBuilder,PermissionFlagsBits } = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('to send something with bot')
    .addStringOption(Option => 
        Option
        .setName('message')
        .setDescription('the text you want to send with bot')
        .setRequired(true)),
        cooldown: 10000,
        async execute(interaction, client) {
            let clientMember = await interaction.guild.members.fetch(client.user.id);
            if (!clientMember.permissions.has(PermissionFlagsBits.SendMessages)) return interaction.reply({content: `Im Dont Have Permission`})
            const txt = interaction.options.getString('message')
            await interaction.channel.send({content: `> ${txt}`})
        }
    
}