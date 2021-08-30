const MessageEmbed = require('discord.js');
const sh = require('../config/embed.json');

module.exports = (client, message, queue) => {
	const embed = new MessageEmbed()
	.setTitle('Déconnecter!')
	.setDescription(`Music stoper parce que j'ai été déconnecter du channel!`)
	.setFooter(sh.footer)
	.setColor(sh.color)
	.setThumbnail(sh.logo)
	.setTimestamp();
    message.channel.send(embed);

};