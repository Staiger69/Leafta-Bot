const MessageEmbed = require('discord.js');
const sh = require('../config/embed.json');

module.exports = (client, message, queue, track) => {

	const embed = new MessageEmbed()
	.setTitle('Son ajouté!')
	.setDescription(`${track.title} a été ajouté a la queu!`)
	.setFooter(sh.footer)
	.setColor(sh.color)
	.setThumbnail(sh.logo)
	.setTimestamp();
    message.channel.send(embed);

};