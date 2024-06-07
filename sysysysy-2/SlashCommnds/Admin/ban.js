const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
module.exports ={
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Select a member and ban theme.')
    .addUserOption(option => 
        option
        .setName('target')
        .setDescription('The member to ban .')
        .setRequired(true))
       .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
            async execute(interaction, client) {
          
              
       if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) return interaction.reply({content:`** 😕 You don't have permission **`});
       let clientMember = await interaction.guild.members.fetch(client.user.id);
       if (!clientMember.permissions.has(PermissionFlagsBits.BanMembers)) return interaction.reply({content: `Im Dont Have Permission`})
       const user = interaction.options.getUser("target");
       const member = await interaction.guild.members.fetch(user.id);
       if (interaction.member.roles.highest.position < member.roles.highest.position)
        return interaction.editReply({content: `You can't take action on ${user.username} since they have a higher role.`});
        if(member.user.id == client.user.id) return interaction.editReply(`⚠ | You can't ban me 😂`);
        if(user.id === interaction.user.id) return interaction.channel.send('**:x: You cannot ban yourself**');
        await interaction.guild.members.ban(user).catch(err => {interaction.reply({content: `Chick MY Roles :confused:`})});
       await interaction.reply({content:`✅ **${user.tag} banned from the server!**✈️`});
            }
};