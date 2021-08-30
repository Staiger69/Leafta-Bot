const { MessageEmbed } = require('discord.js');
const sh = require('../../config/embed.json')

const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports = {
    name: 'baka',
    aliases: [],
    category: 'Roleplay',
    utilisation: `\`baka @user\``,
    description: 'Permet d\'insulter une personne de baka en la mentionnant.',

    execute(client, message, args) {

    async function baka() {
    let target = message.guild.member(message.mentions.users.first());
    if (!target) {
        message.channel.send(" ❌ - Tu dois mentionner u ne personne!");
        return;
    }
    const baka = await neko.sfw.baka();
    const embed = new MessageEmbed()
        .setTitle(message.author.username + " insulte " + target.user.username + ' de baka' )
        .setImage(baka.url)
    message.channel.send(embed);
    }
    baka();
    }
}