
module.exports = (bot, author) =>{
    const user = bot.guilds.cache.first().members.cache.find(u => u.id === author.id);
    if(user._roles.includes(require("../../config/ids.json").adm))
        return true;
    else
        return false;
}