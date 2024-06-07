const { SlashCommandBuilder,PermissionFlagsBits, EmbedBuilder,ButtonStyle, ActionRowBuilder,ButtonBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()

  .setName('avatar')
  .setDescription('Avatar Member')
  .addUserOption(option => 
  option 
  .setName('user')
  .setDescription('Pelese Select User')
  .setRequired(false)),

  async execute(interaction,client) {
   let user = interaction.options.getUser('user') || interaction.member;  
   let userr = interaction.member.guild.members.cache.get(user.id)
   let clientMember = await interaction.guild.members.fetch(client.user.id);
   if (!clientMember.permissions.has(PermissionFlagsBits.BanMembers)) return interaction.reply({content: `Im Dont Have Permission`})

    let embed = new EmbedBuilder()
    .setTitle(`${userr.user.tag}'s Avatar`)
    .setImage(`${userr.user.displayAvatarURL({ dynamic: true, size: 1024 })}`)
    .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
    .setColor('#2e2e2e');

    interaction.reply({embeds: [embed]})
  }
}