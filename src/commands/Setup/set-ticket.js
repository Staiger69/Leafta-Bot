const { MessageEmbed } = require('discord.js');
const sh = require('../../config/embed.json')


module.exports = {
  name: 'set-ticket',
  aliases: [],
  category: 'Setup',
  utilisation: `\`ticket-setup #channel\``,
  description: 'Permet d\'afficher le sustème d\'ouverture de ticket.',

  execute (client, message, args) {

  if(message && message.deletable) message.delete().catch(e => {});

  let embed = new MessageEmbed()
  .setTitle(`Système de Ticket`)
  .setDescription(`Réagissez avec 🎟️ pour créer un ticket.`);
  message.channel.send(embed).then(m => {
  m.react('🎟️');
  });
      
  }
}

