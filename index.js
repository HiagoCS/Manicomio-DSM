//Requires
require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');

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
bot.login(process.env.BOT_TOKEN);
bot.on("ready", () =>{
    
});