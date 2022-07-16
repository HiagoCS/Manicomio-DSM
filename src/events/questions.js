const Discord = require('discord.js');
const cache = require('../config/quest_cache.json');
const id = require('../config/ids.json');
const fs = require('fs');
let globalIndex = 0;
module.exports = {
    name:"questions",
    run:(bot) =>{
        const server = bot.guilds.cache.get(id.guild);
        if(!cache.isEnable){
            if(server.channels.cache.find(c => c.name === 'regis_quest')){
                askQuest(bot, server.channels.cache.find(c => c.name === 'regis_quest'), server.members.cache.find(u => u._roles.includes(id.adm)));
            }
            else{
                server.channels.cache.find(c => c.id === id.adm_category)
                    .createChannel("regis_quest",{
                        permissionsOverwrites: [
                            {
                                id: id.adm, 
                                allow:['VIEW_CHANNEL']
                            },
                            {
                                id: server.roles.cache.find(r => r.name == "@everyone").id,
                                deny:['VIEW_CHANNEL']
                            },
                            {
                                id: bot.id,
                                allow:['VIEW_CHANNEL']
                            }
                        ]
                    }).catch(console.error);
                askQuest(bot, server.channels.find(c => c.name === 'regis_quest'), server.members.cache.find(u => u._roles.includes(id.adm)));
            }
            
        }
    }
}

function askQuest(bot, pChannel, user){
    pChannel.send({content:`Escreva (pergunta?cargoA.descriçãoA-cargoB.descriçãoB-cargoC.descriçãoC)`})
        .then(msg =>{
            const filter = b => b.author.id === user.id;
            pChannel.awaitMessages({filter,max:1})
                .then(collect =>{
                    msg.delete();
                    if(collect.first().content.includes("?") && collect.first().content.includes("-")){
                        const splitItem = collect.first().content.split("?");
                        const ask = splitItem[0];
                        const answ = splitItem[1].split("-");
                        const embed = {
                            title:ask+"?",
                            fields:[]
                        }
                        for(let i in answ){
                            const answ_role = answ[i].split(".");
                            embed.fields.push({name:`${parseInt(i)+1}: ${answ_role[0]}`, value:`${answ_role[1]}`})
                        }
                        pChannel.send({embeds:[embed], components:[require("../modulesExports/buttons/yesno")], content:"Assim?"})
                            .then(msg =>{
                                const filter = b => b.user.id === user.id;
                                pChannel.awaitMessageComponent({filter,max:1})
                                    .then(collect =>{
                                        msg.delete()
                                        if(collect.customId == "yes"){
                                            cache.quests.push({
                                                "ask": ask+"?",
                                                "answers": [],
                                                "description":[]
                                            });
                                            for(let i in answ){
                                                const splitItem = answ[i].split(".");
                                                cache.quests[`${globalIndex}`].answers.push(splitItem[0]);
                                                cache.quests[`${globalIndex}`].description.push(splitItem[1]);
                                            }
                                            pChannel.send({content:"Deseja adicionar mais perguntas?", components:[require("../modulesExports/buttons/yesno")]})
                                                .then(msg =>{
                                                    const filter = b => b.user.id === user.id;
                                                    pChannel.awaitMessageComponent({filter,max:1})
                                                        .then(collect =>{
                                                            msg.delete()
                                                            if(collect.customId == "yes"){
                                                                globalIndex++;
                                                                askQuest(bot, pChannel, user);
                                                            }
                                                            else{
                                                                console.log(cache);
                                                                const json = JSON.stringify(cache)
                                                                fs.writeFile("src/config/quest_cache.json", json, {encoding: "utf8"}, (err) =>{
                                                                    if(err) console.log(err);
                                                                    else{
                                                                        pChannel.send({content:"Perguntas Registradas com sucesso!!"});
                                                                    }
                                                                })
                                                            }
                                                        }).catch(console.error);
                                                })
                                        }
                                        else{
                                            askQuest(bot, pChannel, user);
                                        }
                                    }).catch(console.error);
                            })
                    }
                    else{
                        askQuest(bot, pChannel, user);
                    }
                }).catch(console.error);
        })
}