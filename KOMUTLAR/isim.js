const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (message.channel.type === "dm") return;
  let saritik = client.emojis.get("655889156198760468");
  let verifyroless = message.guild.roles.find(`id`, "675460462405746739");
  if (!message.member.roles.find("id", "675460462405746739")) {
    return message.channel.send(
      `Bu Komutu Kullanmak için CH「TR」Komut Rolüne Sahip Olman Lazım!`
    );
  }
  let member = message.mentions.members.first();
  let isim = args.slice(1).join(" ");
  if (!member) return message.channel.send("Bir üye etiketlemelisin");
  if (!isim) return message.channel.send("Bir isim yazmalısın");
  member.setNickname(`${isim}`);
  const embed = new Discord.RichEmbed()
    .addField(
      `• Eylem Nick Değiştirme. ${saritik}`,
      `Nicki Değiştirilen kullanıcı : ${member.user} \n Yeni kullanıcı adı : \`${isim}\``
    )

    .setFooter(
      `Değiştiren Yetkili ${message.author.tag}`,
      message.author.avatarURL
    )
    .setThumbnail(member.user.avatarURL);
  message.channel.send(embed);

  const sa = new Discord.RichEmbed()
    .addField(
      `• Eylem Nick Değiştirme. ${saritik}`,
      `Nicki Değiştirilen kullanıcı : ${member.user} \n Yeni kullanıcı adı : \`${isim}\``
    )

    .setFooter(
      `Değiştiren Yetkili ${message.author.tag}`,
      message.author.avatarURL
    )
    .setThumbnail(member.user.avatarURL);
  client.channels.get("675444233213181972").send(sa);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [`nick`],
  permLevel: 0
};
exports.help = {
  name: "isim",
  description: "Birinin nickini değiştirir.",
  usage: "isim <yeni isim>"
};