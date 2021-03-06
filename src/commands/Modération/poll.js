const { MessageEmbed } = require("discord.js");
const sh = require('../../config/embed.json')

reactions = ['๐ฆ', '๐ง', '๐จ', '๐ฉ', '๐ช', '๐ซ', '๐ฌ', '๐ญ', '๐ฎ', '๐ฏ', '๐ฐ', '๐ฑ', '๐ฒ', '๐ณ', '๐ด', '๐ต', '๐ถ', '๐ท', '๐ธ', '๐น']

module.exports = {
  name: 'poll',
  aliases: [],
  category: 'Modรฉration',
  utilisation: `\`poll\``,
  description: 'Permet de faire des sondages.',

  execute(client, message, args) {

  async function poll() {
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(new MessageEmbed()
    .setTitle(`โ - Tu n'as pas les permissions requise! [MANAGE_GULD]`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  const [question, ...choices] = args.join(' ').split(' | ')

  if (!question) return message.channel.send(new MessageEmbed()
    .setTitle(`โ -  Il faut indiquer la question a poser`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  if (!choices.length) return message.channel.send(new MessageEmbed()
    .setTitle(`โ - Il faut indiquez au moins un choix`)
    .description('\`poll <question> | choix1 | choix2\`')
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());
    
  if (choices.length > 20) return message.channel.send(new MessageEmbed()
    .setTitle(`โ - Il ne peut pas avoir plus de 20choix`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  const sent = await message.channel.send(new MessageEmbed()
    .setTitle(question)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp()
    .setDescription(choices.map((choice, i) => `${reactions[i]} ${choice}`).join('\n\n')))
    for (i = 0; i < choices.length; i++) await sent.react(reactions[i]);
           
  }
  poll();
  }
}