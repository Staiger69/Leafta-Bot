const { MessageEmbed } = require('discord.js');
const sh = require('../../config/embed.json')

const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports = {
    name: 'pat',
    aliases: [],
    category: 'Roleplay',
    utilisation: `\`pat @user\``,
    description: 'Permet de pat quelqu\'un en la mentionnant.',

    execute(client, message, args) {
        
    async function pat() {
    let target = message.guild.member(message.mentions.users.first());
   if (!target) {
        message.channel.send(" ❌ - Tu dois mentionner u ne personne!");
        return;
    }
    const pat = await neko.sfw.pat();
    const embed = new MessageEmbed()
        .setTitle(message.author.username + " pat " + target.user.username)
        .setImage(pat.url)
    message.channel.send(embed);
    }
    pat();
    }
}