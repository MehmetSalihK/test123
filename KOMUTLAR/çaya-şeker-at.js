const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Özel Mesajda Şeker Atamazsın... Git Benim Olduğum Sunucuda Yap... Birlikte Şekerli Çay İçeriz :D**')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor(message.author.username + 'Çayına Şeker Attı... Abi Bizede Bari Çay Ismarla Yaw')
    .setColor("Random")
    .setTimestamp()
    .setDescription('')
    .setImage(`https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4tptwEecMLS0HJ9mc8EflFlPxCdqtAm5t-iwYkCkyY4wQ0YFq`)
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'çaya-şeker-at',
  description: 'Çaya Şeker Atar.',
  usage: 'çaya-şeker-at'
};