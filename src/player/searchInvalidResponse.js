const MessageEmbed = require('discord.js');
const sh = require('../config/embed.json');

module.exports = (client, message, query, tracks, content, collector) => {

	const embed = new MessageEmbed()
	.setTitle('Réponse invalide!')
	.setDescription(`Tu dois choisir un nombre entre **1** et **${tracks.length}** !`)
	.setFooter(sh.footer)
	.setColor(sh.color)
	.setThumbnail(sh.logo)
	.setTimestamp();
    message.channel.send(embed);

};