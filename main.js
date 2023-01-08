const Discord = require('discord.js');

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildVoiceStates
    ]
})

client.once('ready', () => {
	console.log('Ready!');
});

client.login('MTA2MTM5OTY4Mjc3OTIwNTY5Mw.GDgg0M.Gdz7Y3PoZcLoTIxL1OUEU8rY2eBuTnlDEvGOEE');