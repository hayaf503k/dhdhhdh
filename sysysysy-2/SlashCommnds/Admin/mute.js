const { SlashCommandBuilder,PermissionFlagsBits } = require("discord.js");
const { execute } = require("./ban");
const ms = require('ms')
module.exports = {
    data:new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute Member Guilde')
    .addUserOption(Option => 
        Option
        .setName('user')
        .setDescription('Select Memeber ')
        .setRequired(true))
        .addStringOption(option => 
            option
            .setName('time')
            .setDescription('time')
            .setRequired(true))
 .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
	.setDMPermission(false),

            async execute(interaction, client) {
                if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) return interaction.reply({content:`** 😕 You don't have permission **`});
                let clientMember = await interaction.guild.members.fetch(client.user.id);
                if (!clientMember.permissions.has(PermissionFlagsBits.ManageRoles)) return interaction.reply({content: `Im Dont Have Permission`})
                         const User = await interaction.options.getMember('user')
                const Time = await interaction.options.getString('time')
                const MuteRole = await interaction.guild.roles.cache.find(Role => Role.name === 'Muted')
                if(!MuteRole) return interaction.reply({ content: `I Can't Find Mute Role!` })
                if (User.id === interaction.user.id)
                return interaction.reply(`لا يمكنك اعطاء نفسك ميوت`);
                if (interaction.member.roles.highest.position < User.roles.highest.position)
                return interaction.reply(
                 `لا يمكنك اجراء هذا الامر على هذا العضو لأن رتبته اعلى من رتبتك `);
                User.roles.add(MuteRole)
                interaction.reply({ content: `:white_check_mark: ${User} has been Muted!` })
                setTimeout(() => {
                    User.roles.remove(MuteRole)
                }, ms(Time))
            }
}
