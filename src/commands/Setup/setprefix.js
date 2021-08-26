const { MessageEmbed, message, client } = require('discord.js');
const sh = require('../../config/embed.json')
const db = require("quick.db")

module.exports = {
  name: 'setprefix',
  aliases: [],
  category: 'Setup',
  utilisation: `\`setprefix <prefix>\``,
  description: 'Permet de changer le prefix du bot.',

  execute (client, message, args) {

  async function prefix()  {
  if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Tu n'as pas les permissions requise! [MANAGE_GUILD]`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  if(!args[0]) return message.channel.send(new MessageEmbed()
    .setTitle('**❌ - il faut précisez le nouveaux prefix du bot')
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  await db.set(`prefix_${message.guild.id}`, args[0])

  message.channel.send(new MessageEmbed()
    .setTitle(`Le prefix a bien été changer :tada:`)
    .addField('Nouveaux prefix', `\`${args[0]}\``)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp())
  }
  prefix();
  }
}