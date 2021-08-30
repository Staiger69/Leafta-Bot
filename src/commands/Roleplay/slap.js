const { MessageEmbed } = require('discord.js');
const sh = require('../../config/embed.json')

const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports = {
    name: 'slap',
    aliases: [],
    category: 'Roleplay',
    utilisation: `\`slap @user\``,
    description: 'Permet de gifler une personne en la mentionnant.',

    execute(client, message, args) {
        
    async function slap() {
    let target = message.guild.member(message.mentions.users.first());
    if (!target) {
        message.channel.send(" ❌ - Tu dois mentionner u ne personne!");
         return;
        }
    const slap = await neko.sfw.slap();
    const embed = new MessageEmbed()
        .setTitle(message.author.username + " gifle" + target.user.username )
        .setImage(slap.url)
    message.channel.send(embed);
    }
    slap();
    }
}