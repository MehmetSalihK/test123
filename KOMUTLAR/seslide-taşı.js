const Discord = require("discord.js"); 

exports.run = (client, message, args) => { 

if (!message.member.hasPermissions("MOVE_MEMBERS")) return message.channel.send("⛔ Bu komutu kullana bilmek için `Üyeleri taşı` yetkisine sahip olmanız gerek") 
let kanal = args[1]; 
let kullanici = message.mentions.members.first() 
if (!kanal) return message.channel.send("Kanal belirtmedin") 
if (!kullanici) return message.channel.send("Kullanıcıyı belirtmedin") 

kullanici.setVoiceChannel(`${kanal}`)
.then(() => message.channel.send(`${kullanici} <#${kanal}> adlı kanala taşındı`)) 
.catch(console.error); 
} 


exports.conf = { 

enabled: true,
guildOnly: true, 
aliases: [], 
permLevel: 0
 }; 

exports.help = { 
name: 'sese-taşı', 
description: 'İstediğiniz kişiniyi bir sesli kanaldan diğerine taşır.', 
usage: 'sese-taşı [kullanıcı] [kanal id]' 
};
 