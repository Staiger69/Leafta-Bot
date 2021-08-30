const MessageEmbed = require('discord.js');
const sh = require('../config/embed.json');

module.exports = (client, message, track) => {

    const embed = new MessageEmbed()
	.setTitle('Je joue!')
	.setDescription(`[${track.title}](${track.url}) dans **${message.member.voice.channel.name}**, **Demandé par** [<@${track.requestedBy.id}>]!`)
	.setFooter(sh.footer)
	.setColor(sh.color)
	.setThumbnail(sh.logo)
	.setTimestamp();
    message.channel.send(embed);
};