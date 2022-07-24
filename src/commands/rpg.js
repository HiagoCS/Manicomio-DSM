module.exports = {
    name:"rpg",
    run:(bot, msg, args) =>{
        if(args){
            switch(args.toLowerCase()){
                case "new":
                    newSession(bot, msg, require("../config/rpg_cache.json"));
                default:
                    console.log(msg.author.id);
            }
        }
        else{
            const cache = require("../config/rpg_cache.json");
            if(Object.entries(cache).length == 0){
                return msg.channel.send({content:`Não existe nenhum jogo ativo! use o comando '!rpg new' para criar um novo jogo ou procure opções com '!help rpg'`});
            }
            else{
                const embed = {
                    title:"Sessões criadas",
                    description:"Estas são as sessões que já estão ativas!",
                    fields:[]
                }
                for(let i in cache){
                    const status = cache[i].status == true?"Ativo": "Desabilitado";
                    const gm = bot.guilds.cache.first().members.cache.find(u => u.id === cache[i].id_gm).user;
                    embed.fields.push({name:cache[i].nm_session, value:gm.username+" | "+status});
                }
                return msg.channel.send({embeds:[embed],content:"Para iniciar um jogo use '!rpg play nome_sessão(opcional)', caso esteja desabilitado o jogo será ativado automaticamente!"});
            }
        }
    },
    help:{
        title:`!rpg`,
        description:`Este comando auxilia na criação de salas de RPG`,
        fields:[
            {
                name:"!rpg", value:"Exibe todos as sessões criadas no sistema!"
            },
            {
                name:"!rpg new", value:"Cria uma nova sessão!"
            }
        ]
    }
}

function newSession(bot, msg, cache){
    const session ={
        status:false,
        nm_session:"",
        id_gm:"",
        id_player:[]
    }
    msg.channel.send({content:"Mencione o mestre do jogo para mim!"})
        .then(lastMsg =>{
            const filter = b => b.author.id === msg.author.id;
            msg.channel.awaitMessages({filter, max:1})
                .then(collect =>{
                    lastMsg.delete();
                    if(collect.first().content.includes("<@") && collect.first().content.includes(">")){
                        session.id_gm = collect.first().content.replace(/\D/g, '');
                        msg.channel.send({content:"Qual o nome desta sessão?"})
                            .then(lastMsg =>{
                                const filter = b => b.author.id === msg.author.id;
                                msg.channel.awaitMessages({filter, max:1})
                                    .then(collect =>{
                                        lastMsg.delete();
                                        session.nm_session = collect.first().content;
                                        msg.channel.send({content:"Selecione os jogadores!", components:[require("../modulesExports/lists/user_list")(bot)]})
                                            .then(lastMsg =>{
                                                const filter = b => b.user.id === msg.author.id;
                                                msg.channel.awaitMessageComponent({filter})
                                                    .then(collect =>{
                                                        console.log(collect);
                                                    }).catch(console.error);
                                            }).catch(console.error);
                                    }).catch(console.error);
                            }).catch(console.error);
                    }
                }).catch(console.error);
        }).catch(console.error);
}