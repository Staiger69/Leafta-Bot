const { MessageEmbed } = require('discord.js');
const sh = require('../../config/embed.json')

const db = require("quick.db")


module.exports = {
    name: 'disablemodlogs',
    aliases: [],
    category: 'Setup',
    utilisation: `\`disablemodlogs <channel>\``,
    description: 'Permet d\'enlever les logs de modérateurs.',

    execute (client, message, args) {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new MessageEmbed()
        .setTitle(`❌ - Tu n'as pas les permissions requise! [ADMINISTRATEUR]`)
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp());

    try {
        let a = db.fetch(`modlog_${message.guild.id}`)
        if (!a) {
            return message.channel.send(new MessageEmbed()
                .setTitle(`❌ - Le mod logs a été déjà désactiver`)
                .setFooter(sh.footer)
                .setColor(sh.color)
                .setThumbnail(sh.logo)
                .setTimestamp());
        } else {
            let channel = message.guild.channels.cache.get(a)
            db.delete(`modlog_${message.guild.id}`)

            message.channel.send(new MessageEmbed()
                .setTitle(`✅ - Le mod logs a été déjà désactiver dans le channel ${channel.name}`)
                .setFooter(sh.footer)
                .setColor(sh.color)
                .setThumbnail(sh.logo)
                .setTimestamp());
            }
            return;
        } catch {
            return message.channel.send(new MessageEmbed()
                .setTitle(`❌ Erreur - Permissions requise ou channel non existant`)
                .setFooter(sh.footer)
                .setColor(sh.color)
                .setThumbnail(sh.logo)
                .setTimestamp());
        }
    }
}