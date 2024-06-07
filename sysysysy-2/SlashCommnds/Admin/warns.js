const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder , PermissionFlagsBits} = require("discord.js");
const db = require('pro.db')
let now = new Date();
let moment = require("moment");
module.exports = {
    data: new SlashCommandBuilder()
    .setName('warns').setDescription('warns of a member')
    .addUserOption( option => option .setName('memebr').setDescription('select the member').setRequired(true)),


    async execute( Interaction, Client ) {
        const user = await Interaction.options.getMember('memebr')
        const userr = await Interaction.options.getUser('memebr')

        if (!Interaction.member.permissions.has('ManageMessages') && !Founder.includes(Interaction.user.id) && !OwnerId.includes(Interaction.user.id) ) return Interaction.reply({ content: `**ليسَ لديكَ صلاحياتٌ \`ManageMessages\` لستخدامْ الأمرِ**` })
        let ClientMember = await Interaction.guild.members.fetch(Client.user.id);
        if (!ClientMember.permissions.has(PermissionFlagsBits.ManageMessages)) return Interaction.reply({ content: `**لِلْأسف لَيْس لَديَّ صلاحيَّات مَطلُوبة لِتْنفِيظ الأمْر يُرْجِئ إِعطَاء صَلاحِية مَطلُوبة وَهِي \`ManageMessages\`**` })

        let warns = db.get(`warns_${user.id}`);
        if(warns) {
            let embed = new EmbedBuilder()
            .setAuthor({name: userr.tag,iconURL: userr.avatarURL({dynamic:true})})
            .setDescription(`**عدد تحذيرات <@${userr.id}> : ${warns}**`)
            .setColor("68f9a7")
            .setFooter({ text: Interaction.guild.name, iconURL: Interaction.guild.iconURL({ dynamic: false }) })
            .setThumbnail(Interaction.guild.iconURL())
            .setTimestamp()
            Interaction.reply({embeds: [embed]})
        }else if(!warns || parseInt(warns) == parseInt(0)){
            let embed = new EmbedBuilder()
            .setAuthor({name: userr.tag,iconURL: userr.avatarURL({dynamic:true})})
            .setDescription(`** ليْسَ لديهِ ايُ تحذيراتٍ <@${userr.id}>**`)
            .setColor("68f9a7")
            .setFooter({ text: Interaction.guild.name, iconURL: Interaction.guild.iconURL({ dynamic: false }) })
            .setThumbnail(Interaction.guild.iconURL())
            .setTimestamp()
            Interaction.reply({embeds: [embed]})
        }
    }
}