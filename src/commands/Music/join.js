const { MessageEmbed } = require('discord.js');
const sh = require('../../config/embed.json')

module.exports = {
    name: 'join',
    aliases: [],
    category: 'Music',
    utilisation: `\`join\``,
    description: 'Permet de faire rejoindre le bot dans le salon vocal où tu es.',

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

        if (message.guild.me.voice.channel && message.member.voice.channel.id == message.guild.me.voice.channel.id)
        return message.channel.send(new MessageEmbed()
            .setTitle('Je suis déjà utilisé dans un autre channel vocal!')   
            .setFooter(sh.footer)
	        .setColor(sh.color)
	        .setThumbnail(sh.logo)
	        .setTimestamp()
        );

        message.member.voice.channel.join();

        message.channel.send(new MessageEmbed()
            .setTitle("J'ai rejoins le salon avec succès!")
            .setFooter(sh.footer)
	        .setColor(sh.color)
	        .setThumbnail(sh.logo)
	        .setTimestamp()
        );
    }
}