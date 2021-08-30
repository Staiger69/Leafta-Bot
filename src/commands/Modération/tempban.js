const { MessageEmbed } = require("discord.js");
const sh = require('../../config/embed.json');
const db = require('quick.db');
const parseDuration = require('parse-duration');
humanizeDuration = require('humanize-duration');

module.exports = {
  name: 'tempban',
  aliases: [],
  category: 'Modération',
  utilisation: `\`tempban @user <duration> <raison>\``,
  description: 'Permet de bannir une personne temporairement.',

  execute(client, message, args) {

  async function tempban(){
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Tu n'as pas les permissions requise! [BAN_MEMBERS]`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  const member = message.mentions.members.first()

  if (!member) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Il faut mentionner un utilisateur!`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID)
  return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Tu ne peut pas bannir un plus haut gradé que toi!`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  if (!member.bannable) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Le bot ne peut pas bannir ce membre`)
    .setDescription('Verifie que le rôle du bot est plus que ceux des membres')
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());
    
  const duration = parseDuration(args[1])
  if (!duration) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Il faut indiquer une durée valide`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  const reason = args.slice(2).join(' ') || 'Aucune raison fournie'
  await member.ban({reason}) 
  message.channel.send(new MessageEmbed()
    .setTitle(`✅ - ${member.user.username} a bien été bannis pendant ${humanizeDuration(duration, {language: 'fr'})} par ${message.author.username}`)
    .addField('Raison', `${reason}`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  let channel = db.fetch(`modlog_${message.guild.id}`)
  if (!channel) return;
  let embed = new MessageEmbed()
    .addField("**Action**", "Tempban")
    .addField("**Membre**", `${member.user.username}`)
    .addField("**Moderateur**", message.author.username)
    .addField("**Raison**", `${reason}`)
    .addField("**Durée**", `${humanizeDuration(duration, {language: 'fr'})}`)
    .addField("**Date**", message.createdAt.toLocaleString())
    .setTimestamp()
  var sChannel = message.guild.channels.cache.get(channel)
  if (!sChannel) return;
  sChannel.send(embed)

  setTimeout(() => {
  message.guild.members.unban(member)
  message.channel.send(new MessageEmbed()
    .setTitle(`✅ - ${member.user.username} a bien été unban`)
    .setDescription('Fin du tempban!')
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  let channel = db.fetch(`modlog_${message.guild.id}`)
  if (!channel) return;
  let embed = new MessageEmbed()
    .addField("**Action**", " Fin du tempban")
    .addField("**Membre**", `${member.user.username}`)
    .addField("**Moderateur**", message.author.username)
    .addField("**Raison**", `${reason}`)
    .addField("**Durée**", `${humanizeDuration(duration, {language: 'fr'})}`)
    .addField("**Date**", message.createdAt.toLocaleString())
    .setTimestamp()
  var sChannel = message.guild.channels.cache.get(channel)
  if (!sChannel) return;
  sChannel.send(embed)
  }, duration)
  }
  tempban();
  }
}