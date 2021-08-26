const { MessageEmbed } = require("discord.js");
const dateFormat = require('dateformat');
const db = require('quick.db');
const fs = require('fs');

module.exports = async (bot, reaction, user) => {
  if(reaction.message.partial) await reaction.message.fetch();
  if(reaction.partial) await reaction.fetch();

  let message = reaction.message;
  if(!message) return;
  if(user.bot) return;

  let logsChannel = message.guild.channels.cache.find(c => c.id === db.get(`logs_${message.guild.id}`));

  let already = new MessageEmbed()
  .setAuthor(`⛔ | Éh non ..`)
  .setDescription(`Vous pouvez avoir qu'un seul ticket d'ouvert à la fois.`);

  let success = new MessageEmbed()
  .setTitle(`🎟️ | Système de Ticket`)
  .setDescription(`Veuillez expliquer la raison de votre demande. Un membre de l'équipe prendra en charge votre ticket sous peu.`);

  let split = '';
  let usr = user.id.split(split);
  for (var i = 0; i < usr.length; i++) usr[i] = usr[i].trim();

  if(message.embeds.length === 1 && message.embeds[0].title === 'Système de Ticket' && message.embeds[0].description === 'Réagissez avec 🎟️ pour créer un ticket.'){
    if(reaction.emoji.name === "🎟️"){
      if(!message.guild.channels.cache.find(c => c.name === `ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`)){

        let role = message.guild.roles.cache.find(r => r.name === "Ticket Support");
        if(!role) {
          message.guild.roles.create({data:{name: "Ticket Support", permissions: 0}, reason: 'Le staff a besoin de ce rôle pour voir les tickets.'});
          message.channel.send(`S'il vous plaît, veuillez réagir une nouvelle fois au message de création de ticket.`).then(m => m.delete({timeout: 5000}).catch(e => {}));
          reaction.users.remove(user.id);
          return
        }
        let categoria = message.guild.channels.cache.find(c => c.name == "tickets" && c.type == "category");
        if(!categoria) categoria = await message.guild.channels.create("tickets", {type: "category", position: 1}).catch(e => {return functions.errorEmbed(message, message.channel, "Une erreur a été rencontrée.")});

        let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS']

        message.guild.channels.create(`ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`, { permissionOverwrites:[
          {
            deny: 'VIEW_CHANNEL',
            id: message.guild.id
          },
          {
            allow: permsToHave,
            id: user.id
          },
          {
            allow: permsToHave,
            id: role.id
          },
        ],
        parent: categoria.id,
        reason: `Cet utilisateur a besoin d'aide.`,
        topic: `**ID:** ${user.id} -- **Tag:** ${user.tag} | s!close`
      }).then(channel => {
        channel.send(`${user}`, {embed: success});
        channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;
        let embed = new MessageEmbed()
        .setAuthor(`📝 | Ticket Ouvert`)
        .setTimestamp()
        .setFooter(`Système de Ticket`, bot.user.displayAvatarURL())
        .setDescription(`Un utilisateur à ouvert un ticket et attend qu'on s'occupe de sa demande.`)
        .addField(`Informations`, `**Utilisateur :** \`${user.tag}\`\n**ID :** \`${user.id}\`\n**Ticket :** ${channel}\n**Date :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);
        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)
 
        db.set(`ticket.ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`, { user: user.id });
      })
      reaction.users.remove(user.id);
      return;
    } else {
      reaction.users.remove(user.id);
      message.reply({embed: already}).then(m => m.delete({timeout: 5000}).catch(e => {}));
    }
    } else {
      reaction.users.remove(user.id);
    }
  }

  // ========================= //

  if(message.embeds.length === 1 && message.embeds[0].title === '🎟️ | Ticket Terminé' && message.embeds[0].description === `Réagissez avec \\🗑️ pour fermer le ticket ou ne réagissez pas si vous avez d'autres demandes.`){
    if(reaction.emoji.name === "🗑️"){
      if(user.id === db.get(`ticket.${message.channel.name}.user`)){

        message.channel.delete();

      }
    }
  }


}