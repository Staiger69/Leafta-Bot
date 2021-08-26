const sh = require('../../config/embed.json');
const db = require('quick.db');


module.exports = (client, message) => {


  if (message.author.bot || message.channel.type === 'dm') return;

  async function prefixes() {
    let prefix = db.get(`prefix_${message.guild.id}`);
    if(prefix === null) prefix = config.prefix;
      if (message.content.indexOf(prefix) !== 0) return;
  
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
  
      const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
  
      if (cmd) cmd.execute(client, message, args);
  }
  prefixes();

  if (message.mentions.has(client.user)) { 
   
    let prefix = db.get(`prefix_${message.guild.id}`);
    if(prefix === null) prefix = config.prefix; 
    
    message.channel.send({embed: {
                title: `Besoins d'aide?`,
                description: `Le préfix du bot est \`${prefix}\``,
                fields: [{
                    name: "Développeur",
                    value: `\`Psychedelics Eyes#0667\``
                  },
                ],
                footer: sh.footer,
                color: sh.color,
                thunbmail: sh.logo,
                timestamp: new Date(),
              }
            })
          }
  
  
  const antilink = ['.gg', 'discord.gg/', 'discordapp.com/invite/', '.gg/']
  try {
  if (antilink.some(link => message.content.toLowerCase().includes(link))) {
      message.delete();
      message.channel.send({embed: {
        title: `Les liens sont interdits`,
        footer: sh.footer,
        color: sh.color,
        thunbmail: sh.logo,
        timestamp: new Date(),
      }
    });
  }
  } catch (e) {
  console.log(e);
  }
  
  
  
 /* const bannedword = ['self', 'SeLf', 'SELF', 'SElf','seLF','SeLF','sElf','slef']
  try {
  if (bannedword.some(word => message.content.toLowerCase().includes(word))) {
      message.delete();
      message.channel.send({embed: {
        title: `Ce mot est interdit`,
        footer: sh.footer,
        color: sh.color,
        thunbmail: sh.logo,
        timestamp: new Date(),
      }
    });
  }
  } catch (e) {
  console.log(e);*/

  


}
