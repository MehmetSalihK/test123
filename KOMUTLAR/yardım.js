const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  
    const embedyardim = new Discord.RichEmbed()
    .setColor('#fffa00')
    .setAuthor(`CyberHunter | TR`, client.user.avatarURL) 
      .setDescription('**[Website](YOK)**')
.setThumbnail(client.user.avatarURL)
      .addField('** !Komutlar (9)**', '`afk`, `geldim`, `davet-oluştur`, `davetim`, `emoji-bilgi`, `say`, `id`, `yapımcım`, `steamfiyat`')
      .addField('** !Moderatör (10)**', '`yetki-izinlerim`, `capslock-engel`, `güvenlik`, `güvenlik-sıfırla`, `davet-kanal-ayarla`, `giriş-çıkış`, `ban-liste`, `otorol-ayarla`, `otorol-sıfırla`, `anti-spam`')
      .addField('** !Moderatör2 (12)**', '`log-ayarla`, `log-kanal`, `reklam-kick`, `reklam-taraması`, `ban-sorgu`, `sese-taşı`, `mute`, `sesmute`, `sayaç-ayarla`,`sayaç-sıfırla`, `kick`, `ban`,')
      .addField('** !Eğlence (12)**', '`alkışla`, `öp`, `yaz`, `havadurumu`, `gif-ara`, `emojiyaz`, `hackle`, `fbi`, `efkar-ölçer`, `çaya-şeker-at`, `herkese-benden-çay`, `komikpaylaşım`')
      .addField('** !Oto-açık (4)**', '`sa-as`, `reklam-engel` ,`davet-log`, `botkoruma`,')
      .addField('** !Bot-Sahibi (3)**', '`yedekal`, `yedekyükle`, `reset`')
    .setFooter(`ꏪ Sharon | Kayıt © 2020`, client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embedyardim).catch()
    
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'yardım',
      category: 'Yardım',
      description: 'Yardım kategorilerini gösteir.',
};