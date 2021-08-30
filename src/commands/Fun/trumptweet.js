const sh = require('../../config/embed.json')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'trumptweet',
    aliases: [],
    category: 'Fun',
    utilisation: `\`trumptweet <message>\``,
    description: 'Permet de faire un fake tweet de trump.',

    execute(client, message, args) {

        async function trumptweet() {

        if (!args[0]) return message.channel.send(new MessageEmbed()
        .setTitle('❌ - Il faut fournir un message a tweeter')
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp())

        
        let tweet = message.content.slice(message.content.indexOf(args[0]), message.content.length);
        if (tweet.length > 68) tweet = tweet.slice(0, 65) + '...';
    
        
          const res = await fetch('https://nekobot.xyz/api/imagegen?type=trumptweet&text=' + tweet);
          const img = (await res.json()).message;
          const embed = new MessageEmbed()
            .setTitle(':flag_us:  Trump Tweet  :flag_us: ')
            .setImage(img)
            .setFooter(sh.footer)
            .setColor(sh.color)
            .setTimestamp()
          message.channel.send(embed);
     
        
    }
    trumptweet();
  }
}

    
    

