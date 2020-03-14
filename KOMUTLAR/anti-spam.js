const Discord = require('discord.js');
const fs = require('fs');
let spamEngel = JSON.parse(fs.readFileSync("./ayarlar/spamEngelle.json", "utf8"));

var ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
      const emoji = client.emojis.find("name", "iptal");
      const emoji1 = (client.emojis.find("name", "yesiltik"))
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(`Bu komutu kullanabilmek için **Kanalları Yönet** iznine sahip olmalısın!`);

    let args = message.content.split(' ').slice(1);
        let prefix = ayarlar.prefix
    const secenekler = args.slice(0).join(' ');

    var errembed = new Discord.RichEmbed()
    .setColor("RED")
  .setFooter(`CybeHunter | TR Anti Spam Sistemi`, client.user.avatarURL)
  
    .setAuthor(`Angel`, client.user.avatarURL)
    .addField("**__CybeHunter | TR Anti Spam Sistemi__**","Sunucunuzda Üyelerin Spam Yaptığında Bu Özellik ile Susturulur!")
  .addField("Anti Spam Engelleme","Sunucunuzda Bu Özelliği Açmak istiyosanız **!anti-spam aç** Kapatmak istoyosanız **!anti-spam kapat** yazmanız yeterlidir.")
    if(secenekler.length < 1) return message.channel.send(errembed);
    //if(secenekler === "aç" || "kapat") return message.channel.send(errembed); (bunu da kullanabilirsiniz.)
      if(secenekler.length < 1) return message.reply("Anti Spam engelleme Sistemini Açmak icin `!anti-spam aç` Kapatmak için `!anti-spam kapat` Yazmalısınız!").then(m => m.delete(10000));

    message.delete();

            if (secenekler === "aç") {
        message.channel.send(`Anti Spam koruma sistemi bu sunucuda açıldı. ${emoji1}`).then(m => m.delete(5000));
        spamEngel[message.guild.id] = {
            spamEngel: "acik"
          };

          fs.writeFile("././ayarlar/spamEngelle.json", JSON.stringify(spamEngel), (err) => {
            if (err) console.log(err)
          });
    };

    if (secenekler === "kapat") {
        message.channel.send(`Anti Spam Koruma sistemi bu sunucuda devre dışı bırakıldı. ${emoji}`).then(m => m.delete(5000));
        spamEngel[message.guild.id] = {
            spamEngel: "kapali"
          };

        fs.writeFile("././ayarlar/spamEngelle.json", JSON.stringify(spamEngel), (err) => {
            if (err) console.log(err)
          });
    };
}

    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: []
      };

      exports.help = {
        name: 'anti-spam',
        description: 'Küfür engelleme sistemini açarsınız/kapatırsınız.',
        usage: 'anti-spam'
      };