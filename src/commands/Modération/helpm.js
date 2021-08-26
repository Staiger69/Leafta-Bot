const { MessageEmbed } = require('discord.js');
const sh = require('../../config/embed.json')

const paginationEmbed = require('discord.js-pagination');


module.exports = {
    name: 'helpm',
    aliases: [],
    category: 'Modération',
    utilisation: `\`helpm\``,
    description: 'Affiche un panel de commande de modération.',

    execute(client, message, args) {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new MessageEmbed()
        .setTitle("❌ - Tu n'as pas les permissions requise! [MANAGE_MESSAGES]")
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp());

    if (!args[0]) {

    const mod = message.client.commands.filter(x => x.category == 'Modération').map((x) => '`' + x.name + '`').join(', ');
    const setup = message.client.commands.filter(x => x.category == 'Setup').map((x) => '`' + x.name + '`').join(', ');

    const embed1 = new MessageEmbed()
        .setTitle('Help Panel de modération')
        .setDescription(`Pour avoir plus d'information: \`helpm <nom de la commande>\``)
        .addField('Modération', mod)
        .setThumbnail(sh.logo)
        .setColor(sh.color)
        .setTimestamp()
            
    const embedn = new MessageEmbed()
        .setTitle('Help Panel de modération')
        .addField('Setup', setup)
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
        
    } else {

        let command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));
        if (!command) return message.channel.send(` ❌ - Je ne trouve pas la command!`);

        const embed = new MessageEmbed()
            .setTitle(`Détaille de la commande: ${command.name}`)
            .addField('Nom:', command.name)
            .addField('Catégorie:', command.category)
            .addField('Aliase(s):', command.aliases.length < 1 ? 'Aucun aliase(s)' : command.aliases.join(', '))
            .addField('Utilisation:', command.utilisation)
            .addField('Description', command.description)
            .setFooter(sh.footer)
            .setThumbnail(sh.logo)
            .setColor(sh.color)
            .setTimestamp()
        message.channel.send(embed);

          
    }

      
        
    },
};