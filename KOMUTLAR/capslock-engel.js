const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
  
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
  if (message.author.id !== ayarlar.sahip) return message.channel.send(``)
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`Bu Komutu  Kullanabilmek İçin **Sunucuyu Yönet** Yetkisine Sahip Olmanız Lazım.`)
  
  let capslock = await db.fetch(`capslockengel_${message.guild.id}`)
  if (capslock) {
    db.delete(`capslockengel_${message.guild.id}`)
    message.channel.send(`Capslock engelleme sistemi, kapatıldı!`)
  }
 
  if (!capslock) {
    db.set(`capslockengel_${message.guild.id}`, 'acik')
    message.channel.send(`Capslock engelleme sistemi, aktif!`)
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};
exports.help = {
  name: 'capslock-engel',
  description: 'capslock',
  usage: 'capslock-engel'
};