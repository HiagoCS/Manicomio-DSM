const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name:"clear",
    run:(bot,msg,args) =>{
        if(args){
            
        }
        else{
            let size = 0;
            msg.channel.messages.fetch()
                .then(x =>{
                    x.map(y =>{size++;});
                    msg.channel.bulkDelete(size);
                    msg.channel.send({content:size>1?`Foram deletadas ${size} mensagens!`:`Apenas uma mensagem foi deletada`});
                }).catch(console.error);
        }
    },
    help:{
        title:`!clear`,
        description:`Este comando serve para limpar canais de texto com ou sem especificações`,
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
}