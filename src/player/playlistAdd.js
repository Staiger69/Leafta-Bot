const MessageEmbed = require('discord.js');
const sh = require('../config/embed.json');

module.exports = (client, message, queue, playlist) => {
	
	const embed = new MessageEmbed()
	.setTitle('Playilst ajoutée!')
	.setDescription(`La playist contient **${playlist.tracks.length}** musique!`)
	.setFooter(sh.footer)
	.setColor(sh.color)
	.setThumbnail(sh.logo)
	.setTimestamp();
    message.channel.send(embed);

};