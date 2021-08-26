const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const sh = require('../../config/embed.json')
const { MessageEmbed } = require('discord.js')
const paginationEmbed = require('discord.js-pagination');

module.exports = {
  name: 'stats',
  aliases: [],
  category: 'Info',
  utilisation: `\`stats\``,
  description: 'Permet d\'afficher les statistics du bot.',

  execute(client, message, args) {
        
    async function stats() {
    const d = moment.duration(message.client.uptime);
    const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
    const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;

    const clientStats = stripIndent`
      Commands  :: ${message.client.commands.size}
      Servers   :: ${message.client.guilds.cache.size}
      Users     :: ${message.client.users.cache.size}
      Channels  :: ${message.client.channels.cache.size}
      WS Ping   :: ${Math.round(message.client.ws.ping)}ms
      Uptime    :: ${days} and ${hours}
    `;

    const { totalMemMb, usedMemMb } = await mem.info();
    const serverStats = stripIndent`
      OS        :: ${await os.oos()}
      CPU       :: ${cpu.model()}
      Cores     :: ${cpu.count()}
      CPU Usage :: ${await cpu.usage()} %
      RAM       :: ${totalMemMb} MB
      RAM Usage :: ${usedMemMb} MB 
    `;


    const embed1 = new MessageEmbed()
      .setTitle( sh.botname + ' Statistics')
      .addField('Client', `\`\`\`asciidoc\n${clientStats}\`\`\``)
      .setFooter(sh.footer)
      .setColor(sh.color)
      .setTimestamp()

    const embedn = new MessageEmbed()
      .setTitle( sh.botname + ' Statistics')
      .addField('Server', `\`\`\`asciidoc\n${serverStats}\`\`\``)
      .setFooter(sh.footer)
      .setColor(sh.color)
      .setTimestamp()

    emojiList = ['⏪', '⏩']

    timeout = 320000;

    pages = [
      embed1,
      embedn
    ];

    paginationEmbed(message, pages, emojiList, timeout);
    }
    stats();
    
  }
}