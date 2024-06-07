const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require("fs")
module.exports = {
  cooldown:30,
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("list commands bot"),

    async execute(interaction, client, lang){
     let helpembed = new EmbedBuilder()
     .setColor('Blue')
     .setTitle(`Commands`)
     .setFooter({ text: `by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
     .setThumbnail(interaction.user.displayAvatarURL()).setTimestamp()
     .setDescription(`**📌 Developer : <@792370035238371329>\n 📌 Use \`/Help\`
     /avatar
     /ban
     /come
     /ban
     /clear
     /help
     /kick
     /ping
     /role
     /del-role
     /hide-all
     /hide
     /show-all
     /show
     /lock-all
     /lock
     /mute
     /say
     /set-nickname
     /unban-all
     /unban
     /unlock-all
     /unlock
     /uptime
     /user
     /vban
     /server
     /warn
     /unwarn
     /warns**`)
     await interaction.reply({embeds: [helpembed]})
    },
};