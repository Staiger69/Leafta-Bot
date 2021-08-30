const { MessageEmbed } = require('discord.js');
const sh = require('../../config/embed.json')

module.exports = {
    name: 'clearqueu',
    aliases: [],
    category: 'Music',
    utilisation: `\`clearqueu\``,
    description: 'Efface les musique dans la file d\'attente.',

    execute(client, message, args) {

    if (!message.member.voice.channel) return message.channel.send(new MessageEmbed()
        .setTitle('Il faut que tu sois dans un salon vocal!')
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp()
    );

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
    return message.channel.send( new MessageEmbed()
        .setTitle('Nous ne somme pas dans le même channel vocal!')
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp()
    );

    if (!this.client.player.getQueu(message)) return message.channel.send(new MessageEmbed()
        .setTitle('Il y\' aucune musique a effacer car la file d\'attente est vide!')
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp()
    );

    this.client.player.clearQueue(message);

    const embed = new MessageEmbed()
    .setDescription('La file d\'attente actuelle est effacée, utilisez play <nom de la muisque> pour en ajouter!')
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp()
    message.channel.send(embed)
    }
}