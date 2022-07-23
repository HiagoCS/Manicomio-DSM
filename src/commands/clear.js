module.exports = {
    name:"clear",
    run:(bot,msg,args) =>{
        if(!require("../modulesExports/functions/checkRole")(bot, msg.author))
            return msg.channel.send({content:`Você não tem permissão para usar este comando!`});
        if(args){
            if(args.includes("#") && args.includes("<") && args.includes(">") && !args.includes("@")){
                const cId = args.replace(/\D/g, '');
                const channel = bot.guilds.cache.first().channels.cache.find(c => c.id === cId);
                if(!channel)
                    return msg.channel.send({content:`Canal não existe!`})
                    .then(x =>{
                        setTimeout(() => x.delete(), 5000)
                    }).catch(console.error);
                let size = 0;
                channel.messages.fetch()
                .then(x =>{
                    x.map(y =>{size++;});
                    channel.bulkDelete(size);
                    msg.channel.send({content:size>1?`Foram deletadas ${size} mensagens no canal ${channel.name}!`:`Apenas uma mensagem foi deletada no canal ${channel.name}`})
                        .then(x =>{
                            setTimeout(() => x.delete(), 5000)
                        }).catch(console.error);
                }).catch(console.error);
            }
            else if(args.includes("@") && args.includes("<") && args.includes(">") && !args.includes("#")){
                const uId = args.replace(/\D/g, '');
                const user = bot.guilds.cache.first().members.cache.find(u => u.id === uId).user;
                if(!user)
                    return msg.channel.send({content:`Este usuário não existe!`})
                    .then(x =>{
                        setTimeout(() => x.delete(), 5000)
                    }).catch(console.error);
                msg.channel.messages.fetch()
                .then(x =>{
                    const array = [];
                    x.filter(m => m.author.id === user.id).forEach(message => array.push(message));
                    msg.channel.bulkDelete(array);
                    msg.channel.send({content:`Todas as mensagens de ${user.username} foram deletadas!`})
                    .then(x =>{
                        setTimeout(() => x.delete(), 5000)
                    }).catch(console.error);
                }).catch(console.error);
            }
            else if(args.includes("@") && args.includes("<") && args.includes(">") && args.includes("#")){
                const splitItem = args.split(" ");
                let uId; let cId;
                for(let i in splitItem){
                    if(splitItem[i].includes("@")){
                        uId = splitItem[i].replace(/\D/g, '');
                    }
                    else{
                        cId = splitItem[i].replace(/\D/g, '');
                    }
                }
                const channel = bot.guilds.cache.first().channels.cache.find(c => c.id === cId);
                const user = bot.guilds.cache.first().members.cache.find(u => u.id === uId).user;
                if(!user)
                    return msg.channel.send({content:`Este usuário não existe!`})
                    .then(x =>{
                        setTimeout(() => x.delete(), 5000)
                    }).catch(console.error);
                channel.messages.fetch()
                .then(x =>{
                    const array = [];
                    x.filter(m => m.author.id === user.id).forEach(message => array.push(message));
                    channel.bulkDelete(array);
                    msg.channel.send({content:`Todas as mensagens do canal ${channel.name} e do usuário ${user.username} foram deletadas!`})
                    .then(x =>{
                        setTimeout(() => x.delete(), 5000)
                    }).catch(console.error);
                }).catch(console.error);
            }
        }
        else{
            let size = 0;
            msg.channel.messages.fetch()
                .then(x =>{
                    x.map(y =>{size++;});
                    msg.channel.bulkDelete(size);
                    msg.channel.send({content:size>1?`Foram deletadas ${size} mensagens!`:`Apenas uma mensagem foi deletada`})
                    .then(x =>{
                        setTimeout(() => x.delete(), 5000)
                    }).catch(console.error);
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