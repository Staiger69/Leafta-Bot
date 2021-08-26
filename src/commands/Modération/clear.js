const { MessageEmbed, BaseManager } = require('discord.js');
const sh = require('../../config/embed.json')

const db = require('quick.db')

module.exports = {
    name: 'clear',
    aliases: [],
    category: 'Modération',
    utilisation: `\`clear <montant>\``,
    description: 'Permet de clear des message.',

    execute(client, message, args) {
    async function clear() {

    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new MessageEmbed()
        .setTitle("❌ - Tu n'as pas les permissions requise! [MANAGE_MESSAGES]")
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp());

    const count = args[0]

    if (!/\d+/.test(count)) return message.channel.send(new MessageEmbed()
        .setTitle("❌ - Tu doit indiquer le nombre a supprimer")
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp());
        
    if (count < 1 || count > 99) return message.channel.send(new MessageEmbed()
        .setTitle("❌ - Le nombre de message de doit être compris entre 1 et 99")
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp());

    const reason = args.slice(1).join(' ') || 'Aucune raison fournie'


    const { size } = await message.channel.bulkDelete(Number(count) + 1, true)

    message.channel.send(new MessageEmbed()
        .setTitle("✅ - ${size - 1} messages ont été supprimés!")
        .addField('Raison', `${reason}`)
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp()).then(sent => sent.delete({timeout: 5e3}))

    let channel = db.fetch(`modlog_${message.guild.id}`)
    if (!channel) return;

    let embed = new MessageEmbed()
        .addField("**Action**", "Clear")
        .addField("**Nombre de message**", `${size - 1}`)
        .addField("**Moderateur**", message.author.username)
        .addField("**Raison**", `${reason}`)
        .addField("**Date**", message.createdAt.toLocaleString())
        .setTimestamp()

    var sChannel = message.guild.channels.cache.get(channel)
    if (!sChannel) return;
    sChannel.send(embed)

    }
    clear();
    }
}