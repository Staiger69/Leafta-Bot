const { MessageEmbed, message} = require('discord.js');
const sh = require('../../config/embed.json')
const db = require('quick.db');

module.exports = {
    name: 'ban',
    aliases: [],
    category: 'Modération',
    utilisation: `\`ban @membre <reason>\``,
    description: 'Permet de ban une personne.',

    execute(client, message, args) {
        
    async function ban() {

    if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new MessageEmbed()
        .setTitle("❌ - Tu n'as pas les permissions requise! [BAN_MEMBERS]")
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp())

    const member = message.mentions.members.first()

    if (!member) return message.channel.send(new MessageEmbed()
        .setTitle("❌ - Il faut mentionner un utilisateur!")
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp());

    if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(new MessageEmbed()
        .setTitle("❌ - Vous pouvez pas bannir ce membre")
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp())
    

    const reason = args.slice(1).join(' ') || 'Aucune raison fournie'

    await member.ban({reason})

    message.channel.send(new MessageEmbed()
        .setTitle("✅ ${member.user.username} a été bannis par ${message.author.username")
        .addField('Raison', `${reason}`)
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp());

    let channel = db.fetch(`modlog_${message.guild.id}`)
    if (!channel) return;
    
    let embed = new MessageEmbed()
        .addField("**Action**", "Ban")
        .addField("**Membre**", `${member.user.username}`)
        .addField("**Moderateur**", message.author.username)
        .addField("**Raison**", `${reason}`)
        .addField("**Date**", message.createdAt.toLocaleString())
        .setTimestamp()
    var sChannel = message.guild.channels.cache.get(channel)
    if (!sChannel) return;
    sChannel.send(embed)

    }
    ban();
    }
}