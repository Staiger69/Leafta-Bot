const sh = require('../../config/embed.json')

const moment = require('moment');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'userinfo',
    aliases: [],
    category: 'Info',
    utilisation: `\`userinfo @membre\``,
    description: 'Permet d\'afficher des informations sur un utilisateur.',

    execute(client, message, args) {

    const member = message.mentions.members.first() || message.member

    if (!member) return message.channel.send( new MessageEmbed()
        .setTitle("❌ - Veuillez mentionnez un membre!")
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp())
        
        message.channel.send(new MessageEmbed()
        .setTitle('User info')
        .addField('Pseudo', `${member.user.username}`)
        .addField('ID', `${member.id}`)
        .addField('Date de création du compte', moment(member.user.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
        .addField('Date d\'arrivée sur le serveur', moment(member.joinedAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
        .setFooter(sh.footer)
        .setThumbnail(member.user.displayAvatarURL())
        .setColor(sh.color)
        .setTimestamp()
        )
    }
}