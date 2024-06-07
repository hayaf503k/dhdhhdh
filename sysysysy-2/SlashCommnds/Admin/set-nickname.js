const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('set-nickname')
    .setDescription('Change Nick Name Mamber For Server')
    .addUserOption(Option =>
        Option
        .setName('user')
        .setDescription('Select User')
        .setRequired(true))
        .addStringOption(Option =>
            Option
            .setName('name')
            .setDescription('add new nick name')
            .setRequired(true))
 .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
	.setDMPermission(false),

            async execute(Interaction, client) {
                const User = Interaction.options.getUser('user')
                const Name = Interaction.options.getString('name')
                if (!Interaction.member.permissions.has('ManageNicknames')) return Interaction.reply({content: `Your Don't Have Permissions`})
                let clientMember = await interaction.guild.members.fetch(client.user.id);
                if (!clientMember.permissions.has(PermissionFlagsBits.ManageNicknames)) return interaction.reply({content: `Im Dont Have Permission`})
                         const Member = await Interaction.guild.members.cache.get(User.id)
                await Member.setNickname(Name)

                await Interaction.reply({content: `${User.user.username}s Nick has been Changed to ${Name}`})
            }
}