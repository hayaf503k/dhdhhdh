const { SlashCommandBuilder , PermissionFlagsBits} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear Messages')
    .addIntegerOption(option =>
        option
        .setName('amomnt')
        .setDescription('Add Number'))
 .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
        async execute(interaction, client) {
            let args = interaction.options.getInteger('amomnt')
            let messagecount = parseInt(args);
            if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) return interaction.reply({content:`** 😕 You don't have permission **`});
            let clientMember = await interaction.guild.members.fetch(client.user.id);
            if (!clientMember.permissions.has(PermissionFlagsBits.ManageMessages)) return interaction.reply({content: `Im Dont Have Permission`})
     
            if (args > 100) return interaction.channel.send({content: `\`\`\`js
            i cant delete more than 100 messages 
            \`\`\``}).then(messages => messages.delete(5000))
            if(!messagecount) messagecount = '100';
            interaction.channel.messages.fetch({limit: 100 }).then(e => {
                interaction.reply('Deleting messages.').then(function(e) {
                setTimeout(function() {
                    interaction.channel.bulkDelete(messagecount).then(msgs => {
                    let msgsize = msgs.size
                    interaction.followUp({content: `\`\`\`js
            ${msgsize} messages cleared
            \`\`\``}).then(messages => {
            setTimeout(() => {
                messages.delete()
            }, 4000)
        })
})})
})})
}}