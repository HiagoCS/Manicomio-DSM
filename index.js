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
//Read and register events
fs.readdir("./src/events/", (err, file) =>{
	if(err) console.log(err);
	let jsFile = file.filter(f => f.split(".").pop() === "js");
	if(jsFile.length <= 0){
		console.log("Não achei nenhum evento porra!!");
		return;
	}
	jsFile.forEach((f, i) =>{
		let props = require(`./src/events/${f}`);
		console.log(`${f} loaded`);
		bot.events.set(props.name, props);
	});
});
bot.events = new Discord.Collection();

//Bot start
bot.login(process.env.BOT_TOKEN);
bot.on("ready", () =>{
    
});