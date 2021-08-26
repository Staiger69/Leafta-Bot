const sh = require('../../config/embed.json')
const pkg = require('../../../package.json');
const { stripIndent } = require('common-tags');
const paginationEmbed = require('discord.js-pagination');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'botinfo',
    aliases: [],
    category: 'Info',
    utilisation: `\`help\``,
    description: 'Affiche un panel de commande.',

    execute(client, message, args) {

        const tech = stripIndent`
        Version     :: ${pkg.version}
        Library     :: Discord.js v12.5.0
        Environment :: Node.js v12.16.3
        Database    :: SQLite
        Commande    :: ${message.client.commands.size}
      `;


      const développeur = stripIndent`
        Discord     :: Psychedelics Eyes#0667
        Paypal      :: paypal.me/psychedelicseyes
        Github 1    :: PsychedelicsEyes
        Github 2    :: LeaftaProject
      `;

        const embed1 = new MessageEmbed()
        .setTitle('Information Bot')
        .addField('Prefix', `\`\``, true)
        .addField('Client ID', `\`${message.client.user.id}\``, true)
        .addField('A propos du bot', `\`\`\`asciidoc\n${tech}\`\`\``)
        .setFooter(sh.footer)
        .setThumbnail(sh.logo)
        .setColor(sh.color)
        .setTimestamp()
        

        const embedn = new MessageEmbed()
        .setTitle('Information Développeur')
        .addField('A propos du Développeur', `\`\`\`asciidoc\n${développeur}\`\`\``)
        .setFooter(sh.footer)
        .setThumbnail(sh.logo)
        .setColor(sh.color)
        .setTimestamp()


        emojiList = ['⏪', '⏩']

        timeout = 320000;

        pages = [
            embed1,
            embedn
        ];

        paginationEmbed(message, pages, emojiList, timeout);

    }
}