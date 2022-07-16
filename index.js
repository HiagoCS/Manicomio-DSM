//Requires
const Discord = require('discord.js');

//Create Client (bot)
const bot = new Discord.Client({
	intents:[
		'GUILDS',
		'GUILD_MESSAGE_REACTIONS',
		'GUILD_MESSAGES',
		'GUILD_INVITES',
		'GUILD_VOICE_STATES',
		'GUILD_MEMBERS',
		'GUILD_PRESENCES'
	]
});

//Bot start
bot.login('OTk3ODc1NzAyMTE4NTAyNTIw.G8k7vq.UaanJFrDxbVN-WRbACAtY6inmE5pUKFFUR8org');
bot.on("ready", () =>{
	console.log("Moderator ON");
});