const { MessageSelectMenu, MessageActionRow } = require('discord.js');

module.exports = (bot) =>{
    const members_raw = bot.guilds.cache.first().members.cache;
    const members = [];
    members_raw.map(user =>{
        if(!user.user.bot)
            members.push({label:user.user.username, description:`${user.user.username}#${user.user.discriminator}`, value:user.user.id});
    });
    const userList = new MessageActionRow(), options = members.map( v =>{
        return v;
    });

    userList.addComponents({
        type: "SELECT_MENU",
        customId:"users",
        placeholder:"Lista de membros do servidor!",
        maxValues:members.length,
        options
    })
    return userList;
}   