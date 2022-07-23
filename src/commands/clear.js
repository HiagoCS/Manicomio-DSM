const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name:"clear",
    run:(bot,msg,args) =>{
        if(args){
            if(args.toLowerCase() == "help"){
                console.log(args);
            }
        }
    }
}