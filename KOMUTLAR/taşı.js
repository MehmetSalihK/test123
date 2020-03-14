  const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  if(!message.member.roles.has("675460462405746739")) return message.channel.send(`Bu Komutu Kullanabilmek İçin **CH「TR」Bot Komut** Rolüne Sahip Olman Gerek!`);
    if (!message.member.voiceChannel) { return message.channel.send("Ses Kanalında Olman Lazım!"); }
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.send('**Kullanıcıyı Etiketlemelisin.**')
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  if(!member.voiceChannel) return message.channel.send("Etiketlenen Kullanıcı Bir Ses Kanalında Değil").then(m =>m.delete(5000))
  const voiceChannel = message.member.voiceChannel.id;
if(!voiceChannel) return
  member.setVoiceChannel(voiceChannel);
   message.react('656151810964324374')
   const voiceChannel1 = message.member.voiceChannel.name;
  let embed= new Discord.RichEmbed()
    .setColor("#000000")
    .setDescription(message.author+" **Tarafından** "+kullanıcı+" **Kullanıcısı** `"+voiceChannel1+"`** Sesli Kanalına Çekildi.**")
    .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
   .setTimestamp()  
    message.channel.send(embed).then(m =>m.delete(10000))
 
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
}
exports.help = {
  name: 'taşı',
  description: "Kullanıcıyı herhangi bi odadan olduğunuz odaya taşır ",
  usage: 'taşı'
}