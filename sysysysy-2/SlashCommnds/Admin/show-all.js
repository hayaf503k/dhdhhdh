const { SlashCommandBuilder,PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('show-all')
    .setDescription('Show All Channels'),

    async execute(interaction,client) {
      
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({content:`** 😕 You don't have permission **`});
        let clientMember = await interaction.guild.members.fetch(client.user.id);
        if (!clientMember.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({content: `Im Dont Have Permission`})
         interaction.guild.channels.cache.forEach((channel) => { 
            channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
                     ViewChannel : true
                     });
         })
         interaction.reply({content:"> ** Done __Show__ All Server Channels**"})
    }

}