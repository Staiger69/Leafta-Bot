const MessageEmbed = require('discord.js');
const sh = require('../config/embed.json');

module.exports = (client, message, queue) => {
	
	const embed = new MessageEmbed()
	.setTitle('Fin de la queu!')
	.setDescription(`Le bot c'est déconnecter car il y'avais plus de musique en queu!`)
	.setFooter(sh.footer)
	.setColor(sh.color)
	.setThumbnail(sh.logo)
	.setTimestamp();
    message.channel.send(embed);

};