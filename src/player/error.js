const MessageEmbed = require('discord.js');
const sh = require('../config/embed.json');

module.exports = (client, error, message) => {
	const embedNotPlaying = new MessageEmbed()
	.setTitle('Erreur!')
	.setDescription(`Il n'y a pas de musique en cours de lecture sur ce serveur!`)
	.setFooter(sh.footer)
	.setColor(sh.color)
	.setThumbnail(sh.logo)
	.setTimestamp();
	const embedNotConnected = new MessageEmbed()
	.setTitle('Erreur!')
	.setDescription(`Tu n'es pas dans un salon vocal!`)
	.setFooter(sh.footer)
	.setColor(sh.color)
	.setThumbnail(sh.logo)
	.setTimestamp();
	const embedUnableToJoin = new MessageEmbed()
	.setTitle('Erreur!')
	.setDescription(`Je n'arrive pas à rejoindre votre canal vocal, veuillez vérifier mes autorisations!`)
	.setFooter(sh.footer)
	.setColor(sh.color)
	.setThumbnail(sh.logo)
	.setTimestamp();
	const embedDefault = new MessageEmbed()
	.setTitle('Erreur!')
	.setDescription(`Quelque chose s'est mal passé... Erreur : ${error}`)
	.setFooter(sh.footer)
	.setColor(sh.color)
	.setThumbnail(sh.logo)
	.setTimestamp();
	
    switch (error) {
        case 'NotPlaying':
            message.channel.send(embedNotPlaying);
            break;
        case 'NotConnected':
            message.channel.send(embedNotConnected);
            break;
        case 'UnableToJoin':
            message.channel.send(embedUnableToJoin);
            break;
        default:
            message.channel.send(embedDefault);
    };
};