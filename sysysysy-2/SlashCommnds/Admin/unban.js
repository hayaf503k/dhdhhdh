const { SlashCommandBuilder,PermissionFlagsBits } = require("discord.js");

module.exports ={
    data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Un Ban for members .')
    .addUserOption(option => 
        option 
        .setName('target')
        .setDescription('Select User Unban')
        .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
            .setDMPermission(false),

            async execute(interaction, client) {
                let clientMember = await interaction.guild.members.fetch(client.user.id);
                if (!clientMember.permissions.has(PermissionFlagsBits.BanMembers)) return interaction.reply({content: `Im Dont Have Permission`})
                     const user = interaction.options.getUser('target')
            interaction.guild.bans.fetch().then(async bans => {
                if(bans.size === 0) return interaction.reply("No one is banned in this server")
            let unbanned = bans.find(ban => ban.user.id === user.id)
            if (!unbanned) return interaction.reply('user dont hav ban')
            interaction.guild.members.unban(user).catch(err => {
                return interaction.reply('Find')
            })
            interaction.reply({Content:`✅** ${user.tag} unbanned!**`})
        })        
        }
        }