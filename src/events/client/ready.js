module.exports = async (client) => {
    console.log(`Connecter au bot: ${client.user.username}`);

    client.user.setActivity("Slt, cv?", {type: "Streaming", url: 'https://www.twitch.tv/psychedelicseyes'});

};