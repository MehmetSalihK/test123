const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
//

exports.run = (client, message, params) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField("**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**");
    return message.author.sendEmbed(ozelmesajuyari);
  }
  if (message.channel.type !== "dm") {
    const alkışla = new Discord.RichEmbed()
      .setTitle(` ${message.author.username}  Alkışlandın Tebrikler!  🎉`)
      .setColor("RANDOM")
      .setTimestamp()
      .setDescription("")
      .setURL("")
      .setImage(
        `https://cdn.discordapp.com/attachments/634056817017880586/645334667817648142/tenor.gif`
      );
    return message.channel.sendEmbed(alkışla);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "alkışla",
  description: "Alkışlanırsınız!",
  usage: "alkışla"
};
 