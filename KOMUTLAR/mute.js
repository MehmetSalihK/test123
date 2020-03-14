const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require("../ayarlar.json");
const prefix = ayarlar.prefix;

var mutelirolu = "「⛔」Muted「⛔」"; //MUTELENDİGİ ZAMAN VERİLECEK ROLU  BURAYA YAZINIZ...

module.exports.run = async (bot, message, args) => {
  if (!message.member.roles.find("id", "675460850940641292"))
    return message.channel.send("**CH「TR」Özel Bot Komut yetkisine sahip değilsin**");
  let mutekisi = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!mutekisi) return message.reply(`Bir Kullanıcı etiketleyiniz `);
  let muterol = message.guild.roles.find(`name`, mutelirolu);
  if (!muterol) {
    try {
      muterol = await message.guild.createRole({
        name: mutelirolu,
        color: "#000000",
        permissions: []
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterol, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  let mutezaman = args[1]
    .replace(`s`, `s`)
    .replace(`m`, `m`)
    .replace(`h`, `h`)
    .replace(`d`, `d`);

  if (!mutezaman) return message.reply(`Doğru bir zaman gir`);

  let guild = message.guild;
  let reason = args.slice(2).join(" ");
  const member = message.guild.member(mutekisi);
  if (reason.length < 1)
    return message.reply("**Mute Sebebini Yazarmısın ?**");
  if (message.mentions.users.size < 1)
    return message
      .reply("**Kime Mute atıcağımı Yazarmısın ?**")
      .catch(console.error);
  if (member.hasPermission("ADMINISTRATOR"))
    return message.reply("__Yönetici Bir Kişiyi Muteleyemem__").then(msg => {
      msg.delete(9000), message.delete(9000);
    });

  await mutekisi.addRole(muterol.id);
  message.react("a:yesiltik:627119242365501451");
  message.channel.send(
    `<@${mutekisi.id}> kullanıcısı __**"${
      args[1]
    }"**__ süresi boyunca __${reason}__ sebebiyle **"Mutelendi"** `
  );
  mutekisi.send(
    `**CyberHunter | TR adlı Sunucuda __**"${
      args[1]
    }"**__ süresi boyunca __${reason}__ sebebiyle **"Mutelendiniz"**  `
  );
  const sChannel = message.guild.channels.find(
    c => c.id === "675454335060017171"
  );
  let modlog = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(
      `<@${
        mutekisi.id
      }> adlı kişi Mutelendi  \n Muteleyen Yetkili: **${
        message.author.username
      }#${
        message.author.discriminator
      }** \n Sebebi : **"${reason}"** \n Zamanı : __**"${args[1]}"**__ `
    )
    .setFooter(`TeamArdaTR`);
  sChannel.send(modlog);

  setTimeout(function() {
    mutekisi.removeRole(muterol.id);
    mutekisi.send(
      `CyberHunter | TR adlı sunucudaki **"Mute"** Süreniz sona ermiştir. `
    );

    const sChannel = message.guild.channels.find(
      c => c.id === "675454335060017171"
    );
    let modlog = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(
        `<@${mutekisi.id}> adlı Kullanıcının "Mute" süresi doldu `
      )
      .setFooter(`TeamArdaTR`);
    sChannel.send(modlog);
  }, ms(mutezaman));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "mute"
};