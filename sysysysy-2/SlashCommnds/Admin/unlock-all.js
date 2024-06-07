const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unlock-all')
    .setDescription('unlock all in channels')
 .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction, client) {

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({content:`** 😕 You don't have permission **`});
        let clientMember = await interaction.guild.members.fetch(client.user.id);
        if (!clientMember.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({content: `Im Dont Have Permission`})
         interaction.guild.channels.cache.each((channel) => { 
            channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
                     SendMessages : true
                     });
         })
            
          interaction.reply({content:`**✅ Done unLocked All this rooms.**`})
        
    }
}