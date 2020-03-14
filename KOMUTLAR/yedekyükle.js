//////teamardatr//////////////////////////
var a = require("../sunucuyedekle.json")

exports.run = (client, message, args) => {

message.guild.channels.forEach(a =>{
a.delete()
})

a.some(b => {

message.guild.createChannel(b.isim, b.tip).then(kan => {
setTimeout(c => {
if(b.parentname === "Yok") return;
else {
var p = message.guild.channels.find(a => a.name === b.parentname)
kan.setParent(p)
}
}, 10000)
})
})}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["yedekyükle"],
    permLevel: 4
}

exports.help = {
    name: 'yedekyukle',
    description: 'Yedeği yükler...',
    usage: "yedekyükle"
}