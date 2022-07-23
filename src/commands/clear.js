const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name:"clear",
    run:(bot,msg,args) =>{
        if(args){
            if(args.toLowerCase() == "help"){
                const helpEmbed = {
                    title:`!clear`,
                    description:this.description,
                    fields:[
                        {
                            name:`Limpar o canal de texto`, value:`!clear`
                        },
                        {
                            name:`Limpar canal de texto especifico`, value:`!clear #canal-desejado`
                        },
                        {
                            name:`Excluir mensagens em canal de texto de um usuário específico`, value:`!clear @usuario`
                        },
                        {
                            name:`Excluir mensagens em canal de texto de um usuário específico em um canal especifico`, value:`!clear @usuario #canal-desejado`
                        }
                    ]
                }
                msg.channel.send({embeds:[helpEmbed]});
            }
        }
    },
    description:`Este comando serve para limpar canais de texto com ou sem especificações`
}