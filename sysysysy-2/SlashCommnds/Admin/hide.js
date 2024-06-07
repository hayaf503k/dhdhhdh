const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('hide')
    .setDescription('Hide Channel')
 .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction, client) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({content:`** 😕 You don't have permission **`});
        let clientMember = await interaction.guild.members.fetch(client.user.id);
        if (!clientMember.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({content: `Im Dont Have Permission`})
           
          let everyone = interaction.guild.roles.cache.find(r => r.name === '@everyone');
          interaction.channel.permissionOverwrites.edit(everyone, {
                      ViewChannel : false
                      }).then(() => {
          interaction.reply({content: `**✅  ${interaction.channel} Done Hided this room.**`})
          })
    }

}