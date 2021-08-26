const { MessageEmbed } = require('discord.js');
const sh = require('../../config/embed.json')
const db = require('quick.db')
const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
  name: 'unban',
  aliases: [],
  category: 'Modération',
  utilisation: `\`unban <id>\``,
  description: 'Permet de unban une personne.',

  execute(client, message, args) {

  async function unban() {
  const id = args[0];
  if (!rgx.test(id)) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Veuillez fournir un ID d'utilisateurs valide`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  const bannedUsers = await message.guild.fetchBans();
  const user = bannedUsers.get(id).user;
  if (!user) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Impossible de trouvet l'utilisateur, veuillez vérifier l'ID fournis`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());
              
  const membermention = message.mentions.members.first()

  if (!membermention) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Le unban marche seulement avec l'id de la personne`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());
        
  let reason = args.slice(1).join(' ');
  if (!reason) reason = 'Aucune raison';
  if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';
        
  await message.guild.members.unban(user, reason);
  const embed2 = new MessageEmbed()
    .setTitle(`✅ Le membre ${user.username} a bien été unban`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp()
  message.channel.send(embed2);


  let channel = db.fetch(`modlog_${message.guild.id}`)
  if (!channel) return;
    
  let embed = new MessageEmbed()
  .addField("**Action**", "Unban")
  .addField("**Membre**", `${user.username}`)
  .addField("**Moderateur**", message.author.username)
  .addField("**Raison**", `${reason}`)
  .addField("**Date**", message.createdAt.toLocaleString())
  .setTimestamp()

  var sChannel = message.guild.channels.cache.get(channel)
  if (!sChannel) return;
  sChannel.send(embed)
  }
  unban();
  }
}