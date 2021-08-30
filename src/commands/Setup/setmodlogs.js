const { MessageEmbed } = require('discord.js');
const sh = require('../../config/embed.json')

const db = require("quick.db")


module.exports = {
  name: 'setmodlogs',
  aliases: [],
  category: 'Setup',
  utilisation: `\`setmodlogs <channel>\``,
  description: 'Permet de mettre en place les logs de modérateurs.',

  execute (client, message, args) {
    
  async function modlogs() {
          
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Tu n'as pas les permissions requise! [ADMINISTRATEUR]`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());
  
  if (!args[0]) {
  let b = await db.fetch(`modlog_${message.guild.id}`);
  let channelName = message.guild.channels.cache.get(b);
  if (message.guild.channels.cache.has(b)) {
  return message.channel.send(new MessageEmbed()
    .setTitle(`✅ - Le mod logs ont été sur le channels ${channelName}`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  } else
  return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Veuillez mentionnez un channel ou donner un id valide!`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  }
  let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
        
  if (!channel || channel.type !== 'text') return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Veuillez mentionnez un channel ou donner un id valide!`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  try {
  let a = await db.fetch(`modlog_${message.guild.id}`)
        
  if (channel.id === a) {
  return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Le mod logs ont été déjà mis en place!`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());
  } else {

  client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send(new MessageEmbed()
    .setTitle(`✅ - Le mod  logs sont bien mis en place dans se channel!`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  db.set(`modlog_${message.guild.id}`, channel.id)
        
  message.channel.send(new MessageEmbed()
    .setTitle(`✅ - Le mod  logs sont bien mis en place dans se channel!`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());
  }
  return
  }catch (error) {
    console.error(error);
  }
  }
  modlogs();
  }
}