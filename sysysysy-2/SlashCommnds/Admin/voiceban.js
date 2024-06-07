const { SlashCommandBuilder,ChannelType, PermissionFlagsBits } = require("discord.js");

module.exports  = {
    data: new SlashCommandBuilder()
    .setName('vban')
    .setDescription('Voice Ban For Server')
    .addUserOption(option => 
        option 
        .setName('user')
        .setDescription('Select User Ban')
        .setRequired(true))
 .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
	.setDMPermission(false),

        async execute(interaction, client,TOBZi) {
            let clientMember = await interaction.guild.members.fetch(client.user.id);
            if (!clientMember.permissions.has(PermissionFlagsBits.SendMessages)) return interaction.reply({content: `Im Dont Have Permission`})
            const Member = interaction.options.getUser('user')
          if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({content:`** 😕 You don't have permission **`});     
          await interaction.guild.channels.cache.forEach((Channel) => {
            if(Channel.type === ChannelType.GuildVoice) {
                Channel.permissionOverwrites.edit(Member, {
                    Connect: false,
                    Speak: false
                })
            }
        })
    interaction.reply({content: `**${Member.username} has been banned from voice channel!**`})    
    }
}