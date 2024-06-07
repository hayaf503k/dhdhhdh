const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder,PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('View the duration of the online bot.'),
    async execute(interaction,client) {
        let clientMember = await interaction.guild.members.fetch(client.user.id);
        if (!clientMember.permissions.has(PermissionFlagsBits.SendMessages)) return interaction.reply({content: `Im Dont Have Permission`})
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
              let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
        
                    const Embed = new EmbedBuilder()
        .setTitle('✅ Uptime Stats:')
              .setDescription(`\`\`\`+ Status : Online\n+ ${uptime} ✅ \`\`\``)
        
        
         await interaction.reply({ embeds: [Embed] });
    }
}