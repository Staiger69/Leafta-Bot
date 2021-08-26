const { MessageEmbed } = require('discord.js');
const sh = require('../../config/embed.json')

const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports = {
    name: 'kiss',
    aliases: [],
    category: 'Roleplay',
    utilisation: `\`kiss @user\``,
    description: 'Permet d\'embrasser une personne en la mentionnant.',

    execute(client, message, args) {
       
    async function kiss() {
    let target = message.guild.member(message.mentions.users.first());
    if (!target) {
        message.channel.send(" ❌ - Tu dois mentionner u ne personne!");
        return;
    }
    const kiss = await neko.sfw.kiss();
    const embed = new MessageEmbed()
        .setTitle(message.author.username + " embrasse " + target.user.username)
        .setImage(kiss.url)
    message.channel.send(embed);
    }
    baka();
    }
}