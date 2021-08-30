const { MessageEmbed } = require('discord.js');
const sh = require('../../config/embed.json');
const db = require('quick.db');

module.exports = {
  name: 'unmute',
  aliases: [],
  category: 'Modération',
  utilisation: `\`unmut @membre <reason>\``,
  description: 'Permet de unmute une personne.',

  execute(client, message, args) {

  async function unmute() {
          
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Tu n'as pas les permissions requise! [MANAGE_MESSAGES]`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  const member = message.mentions.members.first()
  if (!member) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Veuillez mentionner le personne a unmute`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ -  Tu ne peux pas unmute une personne plus haut gradé que toi`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  if (!member.manageable) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ -  Le bot ne peut pas unmute le membre`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  const reason = args.slice(1).join(' ') || 'Aucune raison fournie.'

  const muteRole = message.guild.roles.cache.find(role => role.name === 'Mute')

  if (!muteRole) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ -  le rôle mute n'existe pas`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  await member.roles.remove(muteRole)

  message.channel.send(new MessageEmbed()
    .setTitle(`✅ ${member.user.username} a été unmute par ${message.author.username}`)
    .addField('Raison', `${reason}`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  let channel = db.fetch(`modlog_${message.guild.id}`)
  if (!channel) return;
  let embed = new MessageEmbed()
    .addField("**Action**", "Unmute")
    .addField("**Membre**", `${member.user.username}`)
    .addField("**Moderateur**", message.author.username)
    .addField("**Raison**", `${reason}`)
    .addField("**Date**", message.createdAt.toLocaleString())
    .setTimestamp()
  var sChannel = message.guild.channels.cache.get(channel)
  if (!sChannel) return;
  sChannel.send(embed)
  }
  unmute();
  }
}