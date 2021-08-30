const Discord = require('discord.js');
const Client = require('./src/config/Client')
const client = new Client();
const config = require('./src/config/config.json');
const fs = require('fs');

const { Player } = require('discord-player');

client.player = new Player(client);

client.commands = new Discord.Collection();

fs.readdirSync('./src/commands').forEach(dirs => {
    const commands = fs.readdirSync(`./src/commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        let command = require(`./src/commands/${dirs}/${file}`);
        console.log(`Chargement de la commande: ${file}`);
        if(!command.name) command = command.help()
        client.commands.set(command.name.toLowerCase(), command);
    };
});

fs.readdirSync('./src/events').forEach(dirs => {
    const events = fs.readdirSync(`./src/events/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of events) {
        const event = require(`./src/events/${dirs}/${file}`);
        console.log(`Chargement de l'event: ${file}`);
          client.on(file.split(".")[0], event.bind(null, client));
    };
});



fs.readdirSync('./src/player').forEach(dirs => {
    const player = fs.readdirSync(`./src/player/`).filter(files => files.endsWith('.js'));
    for (const file of player) {
        const event = require(`./src/player/${file}`);
        console.log(`Chargement de l'event player: ${file}`);
          client.on(file.split(".")[0], event.bind(null, client));
    };
});


client.login(config.token)