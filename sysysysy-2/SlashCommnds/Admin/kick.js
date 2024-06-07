const { SlashCommandBuilder, messageLink ,PermissionFlagsBits } = require("discord.js");

module.exports ={
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('kick for member')
    .addUserOption(option => 
        option
        .setName('target')
        .setDescription('The Member to Kick')
        .setRequired(true))
 .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

           async execute(interaction,client) { 
            try {
            const user      = interaction.options.getUser("target");
            const member = await interaction.guild.members.fetch(user.id);
            
            if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) return interaction.reply({content:`** 😕 You don't have permission **`});
            let clientMember = await interaction.guild.members.fetch(client.user.id);
            if (!clientMember.permissions.has(PermissionFlagsBits.BanMembers)) return interaction.reply({content: `Im Dont Have Permission`})
                 if(user.id === interaction.user.id) return interaction.channel.send('**:x: You cannot ban yourself**');
            if (interaction.member.roles.highest.position < member.roles.highest.position)
 return interaction.editReply({content: `You can't take action on ${user.username} since they have a higher role.`});
 if(member.user.id == client.user.id) return interaction.editReply(`⚠ | You can't kick me 😂`);           
 await interaction.guild.members.kick(user).catch(err => {
              return interaction.reply('Check My Roles')
             });
           await interaction.reply({content: `✅ **${user.tag} Kicked from the server!**✈️`})
             
        }catch(err) {
        return;
        }}
}