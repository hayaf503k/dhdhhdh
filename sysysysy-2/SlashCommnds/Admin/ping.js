const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports ={

    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping test'),

    async execute(interaction, client) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    const Embed = new EmbedBuilder()
    .setDescription(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`)    
    .setColor('Random').setTitle('Ping Bot').setTimestamp()
    await interaction.editReply({ embeds: [Embed]}) 
    }
}