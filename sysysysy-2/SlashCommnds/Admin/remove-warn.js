const { SlashCommandBuilder , PermissionFlagsBits} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unwarn').setDescription('unwarn for member')
    .addUserOption( option => option .setName('member').setDescription('select the member').setRequired(true)),


    async execute( Interaction, Client ) {
        if (!Interaction.member.permissions.has('ManageMessages') && !Founder.includes(Interaction.user.id) && !OwnerId.includes(Interaction.user.id) ) return Interaction.reply({ content: `**ليسَ لديكَ صلاحياتٌ \`ManageMessages\` لستخدامْ الأمرِ**` })
        let ClientMember = await Interaction.guild.members.fetch(Client.user.id);
        if (!ClientMember.permissions.has(PermissionFlagsBits.ManageMessages)) return Interaction.reply({ content: `**لِلْأسف لَيْس لَديَّ صلاحيَّات مَطلُوبة لِتْنفِيظ الأمْر يُرْجِئ إِعطَاء صَلاحِية مَطلُوبة وَهِي \`ManageMessages\`**` })
        let user = Interaction.options.getMember('member')
        if (!user) return Interaction.reply({ content: `**يُرْجِئ اِختِيار شَخْص وَعدَم اِخْتياره أيَّ شيٍّ أُخرَى**` })
        if(!user) return Interaction.reply({ content  :`**يرجئَ اختيارُ العضوِ صحيحٍ**` , ephemeral  :true})
        if(user.bot) return Interaction.reply({ content : `**لا يمكنكَ إزالةَ تحذيرٍ عنْ عضوٍ**` , ephemeral  :true})
        if (user.id === Interaction.user.id) { Interaction.reply({ content: `**لا يمكنكَ استعمالُ الأمرِ على نفسكَ**` }) }
        if(!db.has(`warns_${user.id}`)) return Interaction.reply({ content  : `**هذا عضوٌ ليسَ لديهِ أيُ تحذيراتٍ*`})
        db.subtract(`warns_${user.id}` , 1)
        Interaction.reply({ content : `**تمَ إزالةَ تحذيرٍ واحدٍ منْ قبلٍ ${user}**`})
    }
}