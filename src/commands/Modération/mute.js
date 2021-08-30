const { MessageEmbed, client } = require('discord.js');
const sh = require('../../config/embed.json')
const db = require('quick.db')




module.exports = {
    name: 'mute',
    aliases: [],
    category: 'Modération',
    utilisation: `\`mute @membre <reason>\``,
    description: 'Permet de mute une personne.',

    execute(client, message, args) {
      
    async function mute() {

          
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new MessageEmbed()
        .setTitle("❌ - Tu n'as pas les permissions requise! [MANAGE_MESSAGES]")
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp());

    const member = message.mentions.members.first()

        
    if (!member) return message.channel.send(new MessageEmbed()
        .setTitle("❌ - Veuillez mentionnez la personne a mute!")
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp());
        
    if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(new MessageEmbed()
        .setTitle("❌ -  Tu ne peut pas mute une personne plus haut gragé que toi!")
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp());
        

    if (!member.manageable) return message.channel.send(new MessageEmbed()
        .setTitle("❌ - Le bot ne peut pas mute se membre!")
        .setDescription('Verifie que le rôle du bot est plus que ceux des membres')
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp());

    const reason = args.slice(1).join(' ') || 'Aucune raison fournie.'
    let muteRole = message.guild.roles.cache.find(role => role.name === 'Mute')
    if (!muteRole) {
        muteRole = await message.guild.roles.create({
            data: {
                name: 'Mute',
                permissions: 0,
                color: "#0000",
            }
        })
        message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                SEND_MESSAGES: false,
                SPEAK: false,
                ADD_REACTIONS: false
            }))
        }
    await member.roles.add(muteRole)
    message.channel.send(new MessageEmbed()
        .setTitle(`✅ ${member.user.username} a été mute par ${message.author.username}`)
        .addField('Raison', `${reason}`)
        .setFooter(sh.footer)
        .setColor(sh.color)
        .setThumbnail(sh.logo)
        .setTimestamp());
       
    let channel = db.fetch(`modlog_${message.guild.id}`)
    if (!channel) return;

    let embed = new MessageEmbed()
        .addField("**Action**", "Mute")
        .addField("**Membre**", `${member.user.username}`)
        .addField("**Moderateur**", message.author.username)
        .addField("**Raison**", `${reason}`)
        .addField("**Date**", message.createdAt.toLocaleString())
        .setTimestamp()

        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)
     }
     mute();
    }
}