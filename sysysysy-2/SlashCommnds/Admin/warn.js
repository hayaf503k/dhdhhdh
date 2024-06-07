const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder , PermissionFlagsBits } = require("discord.js");
const db = require('pro.db')
let now = new Date();
let moment = require("moment");
module.exports = {
    data: new SlashCommandBuilder()
    .setName('warn').setDescription('warn member')
    .addUserOption( option => option .setName('memebr').setDescription('select the member').setRequired(true))
    .addStringOption(option => option .setName('reason').setDescription('add the reason')),


    async execute( Interaction, Client ) {
        const user = Interaction.options.getMember('memebr')
        const reason = Interaction.options.getString('reason')

        if (!Interaction.member.permissions.has('ManageMessages') && !Founder.includes(Interaction.user.id) && !OwnerId.includes(Interaction.user.id) ) return Interaction.reply({ content: `**ليسَ لديكَ صلاحياتٌ \`ManageMessages\` لستخدامْ الأمرِ**` })
        let ClientMember = await Interaction.guild.members.fetch(Client.user.id);
        if (!ClientMember.permissions.has(PermissionFlagsBits.ManageMessages)) return Interaction.reply({ content: `**لِلْأسف لَيْس لَديَّ صلاحيَّات مَطلُوبة لِتْنفِيظ الأمْر يُرْجِئ إِعطَاء صَلاحِية مَطلُوبة وَهِي \`ManageMessages\`**` })

        if (Interaction.guild.ownerId !== user.id && Interaction.guild.ownerId !== Interaction.member.id || Interaction.guild.ownerId == user.id) return;
        if (Interaction.member.roles.highest.position > Interaction.guild.members.resolve(Client.user).roles.highest.position) return Interaction.reply({ content: `**لِلْأسف رُول اَلعُضو أَعلَى مِن رُول خَاصَّة بِك**` })
        if (Interaction.member.roles.highest.position > Interaction.guild.members.resolve(Interaction.user).roles.highest.position) return Interaction.reply({ content: `**لِلْأسف رُول اَلعُضو أَعلَى مِن رُول خَاصَّة بِي**` })
        if(user.bot) return Interaction.reply({ content : `**لا يمكنكَ إزالةَ تحذيرٍ عنْ عضوٍ**` , ephemeral  :true})
        if (user.id === Interaction.user.id) { Interaction.reply({ content: `**لا يمكنكَ استعمالُ الأمرِ على نفسكَ**` }) }
        db.add(`warns_${user.id}` , 1)
        db.set(`reason_${user.id}` , reason)
        db.set(`Messageauthor_${user.id}` , Interaction.user.id)
        db.set(`time_${user.id}` , moment(now).format("M/D/YYYY"))
        let embed = new EmbedBuilder()
        .setDescription(`**لقدْ تحذيركَ في سيرفرَ : ${Interaction.guild.name}**\n\n**سببٌ : ${reason}**\n\n**منْ قبلٍ : <@${Interaction.user.id}>**\n\n**تاريخٌ : ${moment(now).format("M/D/YYYY")}**`)
        .setThumbnail(Interaction.guild.iconURL())
        .setFooter({ text: Interaction.guild.name, iconURL: Interaction.guild.iconURL({ dynamic: false }) })
        .setColor("Random")
        .setTimestamp()
        user.send({embeds:[embed]})
        let embed2 = new EmbedBuilder()
        .setAuthor({name: Interaction.user.tag,iconURL: Interaction.user.avatarURL({dynamic:true})})
        .setDescription(`**تمَ تحذيرٌ ${user}**\n\n**سببٌ : ${reason}**\n\n**منْ قبلٍ : <@${Interaction.user.id}>**\n\n**تاريخٌ : ${moment(now).format("M/D/YYYY")}**`)
        .setColor("Random")
        .setFooter({ text: Interaction.guild.name, iconURL: Interaction.guild.iconURL({ dynamic: false }) })
        .setThumbnail(Interaction.guild.iconURL())
        .setTimestamp()
        Interaction.reply({embeds: [embed2]})
    }
}