//////teamardatr//////////////////////////
const fs = require('fs')

exports.run = (client, message, args) => {
var list = [];
message.guild.channels.forEach(kan => {
let parent;
if(kan.parent) parent = kan.parent.name
else parent = "Yok"
list.push({ 
"tip": `${kan.type}`,"isim": `${kan.name}`,"parentname": `${parent}`
})
})
fs.writeFile("././sunucuyedekle.json", JSON.stringify(list))
message.channel.sendMessage("Yedek yükleniyor, lütfen bekleyiniz...").then(mesaj => {
   setTimeout(function () {
  mesaj.edit("Yedek yüklendi.")
   }, 1 * 5000)
})
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["yedekal"],
    permLevel: 4
}

exports.help = {
    name: 'yedekal',
    description: 'Sunucunun Yemeğini alır.',
    usage: "yedekal"
}