const Discord = require('discord.js');
const fs = require ('fs');
exports.run = async (bot, message, args) => {
 let onlycode = JSON.parse(fs.readFileSync("./ayarlar/otorol.json", "utf8"));
 let otorol = message.mentions.roles.first();
 if(!otorol) return message.channel.send(`:x: Otorolü ayarlamam için bir rol etiketlemelisin. **Örnek : .otorol-ayarla @Rol #Kanal**`)
 let otokanal = message.mentions.channels.first();
 if(!otokanal) return message.channel.send(`:x: Otorolü verdiğimde bildirimin gitmesi için bir kanal etiketlemelisin.`)
if(!onlycode[message.guild.id]){
onlycode[message.guild.id] = {
  sayi: otorol.id,
  kanal: otokanal.id
 }};
  onlycode[message.guild.id].rol = otorol.id
  onlycode[message.guild.id].kanal = otokanal.id
  fs.writeFile("./ayarlar/otorol.json", JSON.stringify(onlycode))
 message.channel.send(`Otorol başarıyla ${otorol}, otorol kanalı ise başarıyla ${otokanal} olarak belirlendi.`)
};

exports.conf = {
 enabled: true,
 guildOnly: true,
 aliases: ['otorol']
};

exports.help = {
  name: 'otorol-ayarla',
  description: 'Sunucunuza giren kişilere verilecek otorolü ayarlarsınız.',
  usage: 'otorol-ayarla @Rol #Kanal'
};