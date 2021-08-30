const MessageEmbed = require('discord.js');
const sh = require('../config/embed.json');

module.exports = (client, message, query, tracks) => {
	
	const embed = new MessageEmbed()
	.setTitle('Recherche annulé!')
	.setDescription(`Tu n'as pas fourni de réponse valide... Recommence!`)
	.setFooter(sh.footer)
	.setColor(sh.color)
	.setThumbnail(sh.logo)
	.setTimestamp();
    message.channel.send(embed);

};