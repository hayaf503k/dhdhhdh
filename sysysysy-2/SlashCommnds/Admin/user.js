const { SlashCommandBuilder,EmbedBuilder,ActionRowBuilder, PermissionFlagsBits,ButtonBuilder} = require('discord.js')

module.exports = { 
    data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('user info for member')
    .addUserOption(Option => 
        Option
        .setName('user')
        .setDescription('Select User')
        .setRequired(false)),
        cooldown: 5000,
        async execute(interaction, client) {
          let clientMember = await interaction.guild.members.fetch(client.user.id);
          if (!clientMember.permissions.has(PermissionFlagsBits.SendMessages)) return interaction.reply({content: `Im Dont Have Permission`})
            let user = interaction.options.get('user')
            if (user) {
              const wituserembed = new EmbedBuilder()
                     .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true}) })
           .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setDescription(`**Joined Discord :**\n**  <t:${parseInt(user.member.user.createdAt / 1000)}:R>**\n\n**Joined Server :**\n**<t:${parseInt(user.member.joinedAt / 1000)}:R>**`)
                .setThumbnail(user.user.avatarURL())
                .setColor("#7800FF")
      
           
      
              interaction.reply({ embeds: [wituserembed]})
            }
            if (!user) {
              const withoutuserembed = new EmbedBuilder()
                     .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true}) })
           .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setDescription(`**Joined Discord :**\n**<t:${parseInt(interaction.member.user.createdAt / 1000)}:R>**\n\n**Joined Server :**\n**<t:${parseInt(interaction.member.joinedAt / 1000)}:R>**`)
                .setThumbnail(interaction.user.avatarURL())
                .setColor("#7800FF")
      
            
      
              interaction.reply({ embeds: [withoutuserembed],  ephemeral: true })
        }
}}