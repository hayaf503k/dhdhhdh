const { execute } = require("./lock");
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()

    .setName('unban-all')
    .setDescription('Un Ban All Member')
     .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
	.setDMPermission(false),



    async execute(interaction,client) {
      
        if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) return interaction.reply({content:`** 😕 You don't have permission **`});
        let clientMember = await interaction.guild.members.fetch(client.user.id);
        if (!clientMember.permissions.has(PermissionFlagsBits.BanMembers)) return interaction.reply({content: `Im Dont Have Permission`})
        interaction.guild.bans.fetch().then(async bans => {
      if(bans.size === 0) return interaction.reply("No one is banned in this server")
        const serverban = client.guilds.cache.get(interaction.guild.id)
     interaction.guild.bans.fetch().then(bans => {
 bans.forEach(ban => {
 serverban.members.unban(ban.user.id)
 })
 })
      
 interaction.reply({ content: `> ** Done __Unbanned__ All Banlist **` })
   
       })
    }
}