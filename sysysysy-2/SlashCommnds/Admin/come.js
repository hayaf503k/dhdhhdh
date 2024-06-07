const { SlashCommandBuilder } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('come')
    .setDescription('to come a member')
    .addUserOption(option => 
        option
        .setName('user')
        .setDescription('user you want come')
        .setRequired(true)),

        async execute(interaction) {
            let user = interaction.options.getUser('user')

            if(user.bot) return interaction.reply(`**[✘] can't DM a bot**`)
            user.send({content: `⚠️ ${user} { <#${interaction.channel.id}> } تم طلبك هنا من فضلك come to Ticket ⚠️`}).then(async() => {
            return interaction.reply( `> **Done Send Private to ${user}** ✅\n> **Please Wait Come User ** ⏳`)
        })
        .catch((err)=> {
            return interaction.reply({content: `[✘] Sorry , i can't send to ${user}`})
        })
               
        }
}