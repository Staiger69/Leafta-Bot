const { MessageEmbed } = require('discord.js');
const sh = require('../../config/embed.json')


module.exports = {
    name: 'ping',
    aliases: [],
    category: 'Info',
    utilisation: `\`ping\``,
    description: 'Affiche le ping du bot et le ping de l\'api.',

    execute(client, message, args) {

        const embed = new MessageEmbed()
        .setTitle('🏓 Pong!')
        .addField('Latence du bot', ` ${message.createdTimestamp - message.createdTimestamp}ms`)
        .addField('Latence de l\'api', `${Math.round(client.ws.ping)}ms`)
        .setFooter(sh.footer)
        .setThumbnail(sh.logo)
        .setColor(sh.color)
        .setThumbnail()
        message.channel.send(embed)

    }
}