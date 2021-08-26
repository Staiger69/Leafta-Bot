const sh = require('../../config/embed.json')
const { MessageEmbed } = require('discord.js');
const answers = [
    'Il est certain.',
    'Il en est décidément ainsi.',
    'Sans aucun doute.',
    'Oui définitivement.',
    'Vous pouvez vous y fier.',
    'Comme je le vois oui.',
    'Le plus probable.',
    'Bonne perspective.',
    'Oui.',
    'Les signes pointent vers Oui.',
    "Répondre brumeux, réessayer.",
    'Demander à nouveau plus tard.',
    'Mieux vaut ne pas te le dire maintenant.',
    "Impossible de prédire maintenant.",
    'Concentrez-vous et demandez à nouveau.',
    'Ne comptez pas dessus.',
    'Ma réponse est non.',
    'Mes sources disent non.',
    "Les perspectives ne sont pas si bonnes.",
    'Très douteux.'
];

module.exports = {
    name: '8ball',
    aliases: [],
    category: 'Fun',
    utilisation: `\`8ball <question>\``,
    description: 'Pose une question et la boule magique te répondras.',

    execute(client, message, args) {

        const question = args.join(' ');
        if (!question) return  message.channel.send(new MessageEmbed()
        .setTitle("❌ - Il faut poser une question")
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp())
        
        const embed = new MessageEmbed()
          .setTitle('🎱  The Magic 8-Ball  🎱')
          .addField('Question', question)
          .addField('Réponse', `${answers[Math.floor(Math.random() * answers.length)]}`)
          .setFooter(sh.footer)
          .setThumbnail(sh.logo)
          .setColor(sh.color)
          .setTimestamp()
        message.channel.send(embed);
    }
}