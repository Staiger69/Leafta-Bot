const { MessageEmbed } = require("discord.js");
const sh = require('../../config/embed.json');
const db = require('quick.db');
const parseDuration = require('parse-duration');
humanizeDuration = require('humanize-duration');

module.exports = {
  name: 'tempmute',
  aliases: [],
  category: 'Modération',
  utilisation: `\`tempmute @user <duration> <raison>\``,
  description: 'Permet de mute une personne temporairement.',

  execute(client, message, args) {
  
  async function tempmute() {

  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Tu n'as pas les permissions requise! [MANAGE_MESSAGES]`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());
          
  const member = message.mentions.members.first()
  if (!member) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Il faut mentionner le mute a membre`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());
    
  if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Tu ne peut pas mute une personne plus haut gradé que toi`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());
    
  if (!member.manageable) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Le bot ne peut pas mute ce membre`)
    .setDescription('Verifie que le rôle du bot est plus que ceux des membres')
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());
    
  const duration = parseDuration(args[1])
  if (!duration) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Il faut indiquez une durée valide`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  const reason = args.slice(2).join(' ') || 'Aucune raison fournie.'
  let muteRole = message.guild.roles.cache.find(role => role.name === 'Mute')
  if (!muteRole) {
    muteRole = await message.guild.roles.create({
      data: {
        name: 'Mute',
        permissions: 0,
        color: "#0F0E0F",
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
    .setTitle(`✅ - ${member.user.username} a été mute pendant  ${humanizeDuration(duration, {language: 'fr'})} par ${message.author.username}!`)
    .addField('Raison', `${reason}`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());
      
  let channel = db.fetch(`modlog_${message.guild.id}`)
  if (!channel) return;

  let embed = new MessageEmbed()
    .addField("**Action**", " Tempmute")
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
  if (member.deleted || !member.manageable) return
  member.roles.remove(muteRole)

  message.channel.send(new MessageEmbed()
    .setTitle(`✅ - ${member.user.username} a bien été unmute*!`)
    .setDescription('Fin du tempmute')
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());
    
  let channel = db.fetch(`modlog_${message.guild.id}`)
  if (!channel) return;
  let embed = new MessageEmbed()
    .addField("**Action**", "Fin du tempmute")
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
  tempmute();
  }
}