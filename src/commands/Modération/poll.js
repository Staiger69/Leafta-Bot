const { MessageEmbed } = require("discord.js");
const sh = require('../../config/embed.json')

reactions = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹']

module.exports = {
  name: 'poll',
  aliases: [],
  category: 'Modération',
  utilisation: `\`poll\``,
  description: 'Permet de faire des sondages.',

  execute(client, message, args) {

  async function poll() {
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Tu n'as pas les permissions requise! [MANAGE_GULD]`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  const [question, ...choices] = args.join(' ').split(' | ')

  if (!question) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ -  Il faut indiquer la question a poser`)
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());

  if (!choices.length) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Il faut indiquez au moins un choix`)
    .description('\`poll <question> | choix1 | choix2\`')
    .setFooter(sh.footer)
    .setColor(sh.color)
    .setThumbnail(sh.logo)
    .setTimestamp());
    
  if (choices.length > 20) return message.channel.send(new MessageEmbed()
    .setTitle(`❌ - Il ne peut pas avoir plus de 20choix`)
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