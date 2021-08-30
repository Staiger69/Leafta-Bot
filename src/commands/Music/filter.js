const { MessageEmbed } = require('discord.js');
const sh = require('../../config/embed.json')

module.exports = {
    name: 'filter',
    aliases: [],
    category: 'Music',
    utilisation: `\`filter\``,
    description: 'Permet d \'jouter un filtre sur la musique en cours.',

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
    .setTimestamp());
    }
}
