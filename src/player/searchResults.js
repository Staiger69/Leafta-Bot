const MessageEmbed = require('discord.js');
const sh = require('../config/embed.json');

module.exports = (client, message, query, tracks) => {

    const embed = new MessageEmbed()
	.setTitle(`Voici les résultats de ta recherche pour ${query}`)
	.setDescription(`${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`)
	.setFooter(sh.footer)
	.setColor(sh.color)
	.setThumbnail(sh.logo)
	.setTimestamp();
    message.channel.send(embed);

};