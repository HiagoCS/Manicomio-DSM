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
//Read and register commands
fs.readdir("./src/commands/", (err, file) =>{
	if(err) console.log(err);
	let jsFile = file.filter(f => f.split(".").pop() === "js");
	if(jsFile.length <= 0){
		console.log("Não achei comando porra!!");
		return;
	}
	jsFile.forEach((f, i) =>{
		let props = require(`./src/commands/${f}`);
		console.log(`${f} loaded`);
		bot.commands.set(props.name, props);
	});
});
bot.commands = new Discord.Collection();

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
    console.log("Moderator ON!!")
});

//Active commands
bot.on('messageCreate', (msg) =>{
    if(msg.content.includes(" ")){
        let messageArray = msg.content.split(" ");
	    let cmd = messageArray[0];
	    let args = messageArray.slice(1);
	    if (msg.author.bot)
		    return;
	    let commandFile = bot.commands.get(cmd.slice(process.env.PREFIX.length));
	    if (commandFile){
		    if(args.length > 1)
			    commandFile.run(bot, msg, args.toString().replace(",", " "));
		    else
			    commandFile.run(bot, msg, args.toString());
	    }
    }
    else{
        let cmd = msg.content;
        if(msg.author.bot)
            return;
        let commandFile = bot.commands.get(cmd.slice(process.env.PREFIX.length));
        commandFile.run(bot, msg, null);
    }
});