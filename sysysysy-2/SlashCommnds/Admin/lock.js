const { SlashCommandBuilder,PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('lock')
    .setDescription('lock in channel')
 .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
	.setDMPermission(false),
    async execute(interaction, client) {

      if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({content:`** 😕 You don't have permission **`});
      let clientMember = await interaction.guild.members.fetch(client.user.id);
      if (!clientMember.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({content: `Im Dont Have Permission`})
       let everyone = interaction.guild.roles.cache.find(hyper => hyper.name === '@everyone');
        interaction.channel.permissionOverwrites.edit(everyone, {
          SendMessages : false
        }).then(() => {
          interaction.reply({content: `**✅  ${interaction.channel} Done Locked this room.**`})
        })
    }
}