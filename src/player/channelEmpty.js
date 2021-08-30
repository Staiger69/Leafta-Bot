const MessageEmbed = require('discord.js');
const sh = require('../config/embed.json');

module.exports = (client, message, queue) => {
	const embed = new MessageEmbed()
	.setTitle('Channel vide!')
	.setDescription(`La musique c'est stopé parce que le channel était vide!`)
	.setFooter(sh.footer)
	.setColor(sh.color)
	.setThumbnail(sh.logo)
	.setTimestamp();
    message.channel.send(embed);

};