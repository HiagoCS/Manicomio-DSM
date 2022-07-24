const Discord = require('discord.js');

module.exports = {
    name:"help",
    run:(bot, msg, args) =>{
        if(args){
            try{
                msg.channel.send({embeds:[bot.commands.find(cmd => cmd.name === args.toLowerCase()).help]});
            }
            catch{
                msg.channel.send({content:"Esse comando não existe!"});
            }
        }
        else{
            const allHelp = {
                title:"Todos os comandos do bot",
                fields:[]
            }
            bot.commands.map(cmd => {
                allHelp.fields.push({name:cmd.help.title, value:cmd.help.description})
            });
            msg.channel.send({embeds:[allHelp]});
        }
    },
    help:{
        title:"!help",
        description:"Exibe todos os comandos do bot.",
        fields:[
            {
                name:`!help`, value:`Exibe todos os comandos do bot com uma descrição.`
            },
            {
                name:`!help comando_sem_prefixo`, value:`Mostra o comando especificado mais detalhamente.`
            }
        ]
    }
}