const { SlashCommandBuilder,PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('remove-role')
    .setDescription(' Remove Role For Member')
    .addUserOption(option => 
        option
        .setName('user')
        .setDescription('Select User')
        .setRequired(true))
        .addRoleOption(option => 
        option
        .setName('role')
        .setDescription('Select Role')
        .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

    async execute(interaction, client) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) return interaction.reply({content:`** 😕 You don't have permission **`});
    let clientMember = await interaction.guild.members.fetch(client.user.id);
    if (!clientMember.permissions.has(PermissionFlagsBits.ManageRoles)) return interaction.reply({content: `Im Dont Have Permission`})
    const member = interaction.options.getMember('user');
    const role = interaction.options.getRole('role');      
    if(!member) return interaction.reply("> mentions username ")
    if(!role) return interaction.reply("> mentions role .")
    let role2 = interaction.guild.roles.cache.find(r => r == role)
    member.roles.remove(role2).catch(err => {interaction.reply('I did find Role')})
    interaction.reply({Content: `>  has been deleted role ✅ `})
            }
}