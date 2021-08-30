const { MessageEmbed } = require('discord.js');
const sh = require('../../config/embed.json')
const paginationEmbed = require('discord.js-pagination');


module.exports = {
    name: 'help',
    aliases: [],
    category: 'Info',
    utilisation: `\`help\``,
    description: 'Affiche un panel de commande.',

    execute(client, message, args) {
        if (!args[0]) {

            const info = message.client.commands.filter(x => x.category == 'Info').map((x) => '`' + x.name + '`').join(', ');
            const roleplay = message.client.commands.filter(x => x.category == 'Roleplay').map((x) => '`' + x.name + '`').join(', ');
            const fun = message.client.commands.filter(x => x.category == 'Fun').map((x) => '`' + x.name + '`').join(', ');
            const music = message.client.commands.filter(x => x.category == 'Music').map((x) => '`' + x.name + '`').join(', ');

            const embed1 = new MessageEmbed()
            .setTitle('Help Panel')
            .setDescription(`Pour avoir plus d'information: \`help <nom de la commande>\` \n
            Pour avoir accès au panel de modération: \`helpm\``)
            .addField('Info', info)
            .setThumbnail(sh.logo)
            .setColor(sh.color)
            .setTimestamp()

            const embed2 = new MessageEmbed()
            .setTitle('Help Panel')
            .addField('Fun', fun)
            .setThumbnail(sh.logo)
            .setColor(sh.color)
            .setTimestamp()

            const embed3 = new MessageEmbed()
            .setTitle('Help Panel')
            .addField('Music', music)
            .setThumbnail(sh.logo)
            .setColor(sh.color)
            .setTimestamp()

            const embedn = new MessageEmbed()
            .setTitle('Help Panel')
            .addField('RolePlay', roleplay)
            .setThumbnail(sh.logo)
            .setColor(sh.color)
            .setTimestamp()


            emojiList = ['⏪', '⏩']

            timeout = 320000;

            pages = [
                embed1,
                embed2,
                embed3,
                embedn
            ];

            paginationEmbed(message, pages, emojiList, timeout);
        
        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) return message.channel.send(` ❌ - Je ne trouve pas la command!`);

            const embed = new MessageEmbed()
            .setTitle(`Détaille de la commande: ${command.name}`)
            .addField('Nom:', command.name)
            .addField('Catégorie:', command.category)
            .addField('Aliase(s):', command.aliases.length < 1 ? 'Aucun aliase(s)' : command.aliases.join(', '))
            .addField('Utilisation:', helpinfo.utilisation)
            .addField('Description', command.description)
            .setFooter(sh.footer)
            .setThumbnail(sh.logo)
            .setColor(sh.color)
            .setTimestamp()
            message.channel.send(embed);

          
        }

    
 },
}

       