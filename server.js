const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require("./ayarlar.json");
const chalk = require("chalk");
const ms = require("ms");
const fs = require("fs");
const moment = require("moment");
const snekfetch = require("snekfetch");
const db = require("quick.db");
require("./util/eventLoader")(client);
const express = require("express"); 
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(
    ` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const token = "Njc1NDgxNDA5MTQ5NzMwODQ2.XmzLgQ.O9GgEB8YQmqXxVIwsIjRRWbhPPE"; //Botun Tokeni //////////////////////////////////////////

var prefix = settings.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

///////////////////////

client.on("guildMemberAdd", message => {
  let kanall = client.channels.get("675483183914942468");

  let sunucuu = client.guilds.get("675439884940607489");

  kanall.setName(`Toplam Kullanıcı: ${sunucuu.memberCount}`);
});

client.on("guildMemberRemove", message => {
  let kanall = client.channels.get("675483183914942468");

  let sunucuu = client.guilds.get("675439884940607489");

  kanall.setName(`Toplam Kullanıcı: ${sunucuu.memberCount}`);
});

client.on("voiceStateUpdate", async message => {
  let kanall = client.channels.get("675483198834212914");

  let sunucuu = client.guilds.get("675439884940607489");

  const kaantufan = sunucuu.channels.filter(c => c.type === "voice");
  let count = 0;
  for (const [id, voiceChannel] of kaantufan)
    count += voiceChannel.members.size;
  kanall.setName(`Seslideki üye sayısı: ${count}`);
});

client.on("guildMemberAdd", async message => {
  let kanall = client.channels.get("675483211035443239");

  let sunucuu = client.guilds.get("675439884940607489");

  kanall.setName(`Bot sayısı: ${sunucuu.members.filter(m => m.user.bot).size}`);
});

client.on("channelCreate", async message => {
  let kanall = client.channels.get("675483221932376105");

  let sunucuu = client.guilds.get("675439884940607489");

  kanall.setName(`Kanal sayısı: ${sunucuu.channels.size}`);
});

client.on("channelDelete", async message => {
  let kanall = client.channels.get("675483221932376105");

  let sunucuu = client.guilds.get("675439884940607489");

  kanall.setName(`Kanal sayısı: ${sunucuu.channels.size}`);
});

client.on("presenceUpdate", async message => {
  let kanall = client.channels.get("675483232275267615");

  let sunucuu = client.guilds.get("675439884940607489");

  let aktif = sunucuu.members.filter(m => m.user.presence.status === "online")
    .size;
  let bosta = sunucuu.members.filter(m => m.user.presence.status === "idle")
    .size;
  let mesgul = sunucuu.members.filter(m => m.user.presence.status === "dnd")
    .size;
  let kaan = aktif + bosta + mesgul;
  kanall.setName(`Çevrimiçi Üye: ${kaan}`);
});

///////////////////

client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.content.length > 4) {
    if (db.fetch(`capslockengel_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(
                `${msg.author}Bu sunucuda büyük harf kullanımı **CyberHunter | TR** tarafından engelleniyor!`
              )
              .then(m => m.delete(5000));
          }
        }
      }
    }
  }
});

//////////////////

client.on("message", async message => {
  let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  if (sayac[message.guild.id]) {
    if (sayac[message.guild.id].sayi <= message.guild.members.size) {
      const embed = new Discord.RichEmbed()
        .setDescription(
          `Tebrikler ${message.guild.name}! Başarıyla ${sayac[message.guild.id].sayi} kullanıcıya ulaştık, sayaç sıfırlandı!`
        )
        .setColor("RANDOM")
        .setTimestamp();
      message.channel.send({ embed });
      delete sayac[message.guild.id].sayi;
      delete sayac[message.guild.id];
      fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), err => {
        console.log(err);
      });
    }
  }
});
client.on("guildMemberRemove", async member => {
  let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle("")
    .setDescription(``)
    .setColor("RED")
    .setFooter("", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds
      .get(member.guild.id)
      .channels.get(giriscikiskanalID);
    giriscikiskanali.send(
      `:loudspeaker: :white_check_mark: Kullanıcı Ayrıldı. \`${
        sayac[member.guild.id].sayi
      }\` Kişi Olmamıza \`${sayac[member.guild.id].sayi -
        member.guild.memberCount}\` Kişi Kaldı \`${
        member.guild.memberCount
      }\` Kişiyiz! :x: **${member.user.tag}**`
    );
  } catch (e) {
    // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e);
  }
});
client.on("guildMemberAdd", async member => {
  let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle("")
    .setDescription(``)
    .setColor("GREEN")
    .setFooter("", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds
      .get(member.guild.id)
      .channels.get(giriscikiskanalID);
    giriscikiskanali.send(
      `:loudspeaker: :white_check_mark: Kullanıcı Katıldı! \`${
        sayac[member.guild.id].sayi
      }\` Kişi Olmamıza \`${sayac[member.guild.id].sayi -
        member.guild.memberCount}\` Kişi Kaldı \`${
        member.guild.memberCount
      }\` Kişiyiz! Hoşgeldin <@${member.user.id}>!`
    );
  } catch (e) {
    // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e);
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////

/////////////////////////

client.on("guildMemberAdd", async member => {
  let otorol = JSON.parse(fs.readFileSync("./ayarlar/otorol.json", "utf8"));
  let rol = otorol[member.guild.id].rol;
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/otorol.json", "utf8"));
  if (!giriscikis[member.guild.id].kanal) return;
  let otolog = giriscikis[member.guild.id].kanal;
  let otorollogu = client.guilds.get(member.guild.id).channels.get(otolog);
  otorollogu.send(`Sunucuya hoşgeldin ${member}, rolünü başarıyla verdim.`);
  member.addRole(rol);
});

////////////hoşgeldin

///////////

/////////////////dm görme

////////////////

/////////////////////////Otomatik kodlar

client.on("message", msg => {
  if (msg.author.bot == true) return;
  const kufur = [
    "oç",
    "top",
    "amguard",
    "daşşak",
    "sik",
    "sikik",
    "yarrak",
    "yarram",
    "yaram",
    "göt",
    "amcık",
    "vajina",
    "meme",
    "bok",
    "kaka",
    "amcık",
    "köpek",
    "yarak"
  ];
  if (kufur.some(küfür => msg.content.includes(küfür))) {
    if (!msg.member.hasPermission("BAN_MEMBERS")) {
      msg.delete();
      msg.channel.send(
        `Küfürler **${client.user.username}** tarafından engellenmektedir! Küfür Etme !!`
      );
    }
  }
});

client.on("guildMemberAdd", member => {
  if (member.user.bot !== true) {
  } else {
    member.kick(member);
    member.guild.owner.send(
      `:white_check_mark: ${member} adlı bot sunucuya katıldı ama geri atıldı.`
    ); //sunucu kurucusuna mesaj gonderir
  }
});

client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.content.toLowerCase() === "sa") {
    await msg.react("🇦");
    msg.react("🇸");
  }
});

client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.content.toLowerCase() === "Selamün aleyküm") {
    await msg.react("🇦");
    msg.react("🇸");
  }
});

client.on("message", msg => {
  const kzgn = client.emojis.get("658407880403320832");
  const embedlul = new Discord.RichEmbed()
    .setColor(0x00ae86)
    .setDescription(msg.author + " Reklam Yasak Bunu Bilmiyormusun!");

  const embedlulz = new Discord.RichEmbed()
    .setTitle("Sunucunda " + msg.author.tag + " reklam yapıyor!")
    .setColor(0x00ae86)
    .setDescription(
      ".uyar <kişi> komutu ile onu uyarabilir ya da .kick <kişi> veya .ban <kişi> komutlarını kullanarak onu sunucudan uzaklaştırabilirsin!"
    )
    .addField("Kullanıcının mesajı:", "**" + msg.content + "**");

  if (
    msg.content
      .toLowerCase()
      .match(/(discord\.gg\/)|(discordapp\.com\/invite\/) (htpp)/g) &&
    msg.channel.type === "text" &&
    msg.channel
      .permissionsFor(msg.guild.member(client.user))
      .has("MANAGE_MESSAGES")
  ) {
    if (msg.member.hasPermission("BAN_MEMBERS")) {
      return;
    } else {
      msg
        .delete(30)
        .then(deletedMsg => {
          deletedMsg.channel.send(embedlul);
          msg.guild.owner.send(embedlulz).catch(e => {
            console.error(e);
          });
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
});

////////////////////////////////
//////////////////

client.on("message", async message => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`);

  let kullanıcı = message.mentions.users.first() || message.author;
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`);
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`);
  let sebep = afkkullanıcı;

  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;

  if (message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(
        `🔹 \`${message.author.tag}\` Adlı Kullanıcı Artık AFK Değil!`
      );
      db.delete(`afk_${message.author.id}`);
    }
    if (afkkullanıcı)
      return message.channel.send(`
${kullanıcı.tag}\`⏰ Şu Anda AFK\n \nSebep : \`${sebep}\``);
  }

  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(
        `🔹 \`${message.author.tag}\` Adlı Kullanıcı başarılı bi şekilde afk oldu!`
      );
      db.delete(`afk_${message.author.id}`);
    }
  }
});

client.on("channelCreate", async channel => {
  var logs = channel.guild.channels.find(c => c.name === "modlog");
  if (!logs) return console.log("Kanal bulunamadı!");
  const cembed = new Discord.RichEmbed()
    .setTitle("Kanal Kuruldu")
    .setColor("RANDOM")
    .setDescription(
      `**${channel.type} kanal**, adına göre**${channel.name}**, yeni oluşturuldu!`
    )
    .setTimestamp(new Date());
  logs.send(cembed);
});

client.on("channelDelete", async channel => {
  var logs = channel.guild.channels.find(c => c.name === "modlog");
  if (!logs) return console.log("Kanal bulunamadı!");
  const cembed = new Discord.RichEmbed()
    .setTitle("Kanal Silindi")
    .setColor("RANDOM")
    .setDescription(
      `**${channel.type} kanalı**, adına göre **${channel.name}**, sadece silindi!`
    )
    .setTimestamp(new Date());
  logs.send(cembed);
});

//////////////////////////////

const invites = {};
const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on("guildMemberAdd", member => {
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
    const logChannel = member.guild.channels.find(
      channel => channel.name === "「📥」davet-takip"
    );
    if (!logChannel) return;
    logChannel.send(
      `**${member.user.tag}** Sunucuya katıldı davet eden **${inviter.tag}** daveti kullanan kisi sayısı **${invite.uses}**`
    );
  });
});

//////////////////////////////

client.on("channelCreate", async channel => {
  var logs = channel.guild.channels.find(c => c.name === "modlog");
  if (!logs) return console.log("Kanal bulunamadı!");
  const cembed = new Discord.RichEmbed()
    .setTitle("Kanal Kuruldu")
    .setColor("RANDOM")
    .setDescription(
      `**${channel.type} kanal**, adına göre**${channel.name}**, yeni oluşturuldu!`
    )
    .setTimestamp(new Date());
  logs.send(cembed);
});

client.on("channelDelete", async channel => {
  var logs = channel.guild.channels.find(c => c.name === "modlog");
  if (!logs) return console.log("Kanal bulunamadı!");
  const cembed = new Discord.RichEmbed()
    .setTitle("Kanal Silindi")
    .setColor("RANDOM")
    .setDescription(
      `**${channel.type} kanalı**, adına göre **${channel.name}**, sadece silindi!`
    )
    .setTimestamp(new Date());
  logs.send(cembed);
});

client.on("messageDelete", async message => {
  if (message.author.bot) return;

  var user = message.author;

  var kanal = await db.fetch(`modlogK_${message.guild.id}`);
  if (!kanal) return;
  var kanal2 = message.guild.channels.find("name", kanal);

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Mesaj Silindi!`, message.author.avatarURL)
    .addField("Kullanıcı Tag", message.author.tag, true)
    .addField("ID", message.author.id, true)
    .addField("Silinen Mesaj", "```" + message.content + "```")
    .setThumbnail(message.author.avatarURL);
  kanal2.send(embed);
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (oldMsg.author.bot) return;

  var user = oldMsg.author;

  var kanal = await db.fetch(`modlogK_${oldMsg.guild.id}`);
  if (!kanal) return;
  var kanal2 = oldMsg.guild.channels.find("name", kanal);

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Mesaj Düzenlendi!`, oldMsg.author.avatarURL)
    .addField("Kullanıcı Tag", oldMsg.author.tag, true)
    .addField("ID", oldMsg.author.id, true)
    .addField("Eski Mesaj", "```" + oldMsg.content + "```")
    .addField("Yeni Mesaj", "```" + newMsg.content + "```")
    .setThumbnail(oldMsg.author.avatarURL);
  kanal2.send(embed);
});

client.on("roleCreate", async role => {
  var kanal = await db.fetch(`modlogK_${role.guild.id}`);
  if (!kanal) return;
  var kanal2 = role.guild.channels.find("name", kanal);

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Oluşturuldu!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true);
  kanal2.send(embed);
});

client.on("roleDelete", async role => {
  var kanal = await db.fetch(`modlogK_${role.guild.id}`);
  if (!kanal) return;
  var kanal2 = role.guild.channels.find("name", kanal);

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Kaldırıldı!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true);
  kanal2.send(embed);
});

client.on("roleUpdate", async role => {
  if (!log[role.guild.id]) return;

  var kanal = await db.fetch(`modlogK_${role.guild.id}`);
  if (!kanal) return;
  var kanal2 = role.guild.channels.find("name", kanal);

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Güncellendi!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true);
  kanal2.send(embed);
});

client.on("voiceStateUpdate", async (oldMember, newMember) => {
  var kanal = await db.fetch(`modlogK_${oldMember.guild.id}`);
  if (!kanal) return;
  var kanal2 = oldMember.guild.channels.find("name", kanal);

  let newUserChannel = newMember.voiceChannel;
  let oldUserChannel = oldMember.voiceChannel;

  if (oldUserChannel === undefined && newUserChannel !== undefined) {
    const embed = new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription(
        `**${newMember.user.tag}** adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`
      );
    kanal2.send(embed);
  } else if (newUserChannel === undefined) {
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        `**${newMember.user.tag}** adlı kullanıcı bir sesli kanaldan çıkış yaptı!`
      );
    kanal2.send(embed);
  }

  client.on("channelCreate", async (channel, member) => {
    var kanal = await db.fetch(`modlogK_${member.guild.id}`);
    const hgK = member.guild.channels.find("name", kanal);
    if (!hgK) return;
    if (!channel.guild) return;
    if (channel.type === "text") {
      var embed = new Discord.RichEmbed()
        .setColor(3066993)
        .setAuthor(channel.guild.name, channel.guild.iconURL)
        .setDescription(`<#${channel.id}> kanalı oluşturuldu. _(metin kanalı)_`)
        .setFooter(`ID: ${channel.id}`);
      embed.send(embed);
    }
    if (channel.type === "voice") {
      var embed = new Discord.RichEmbed()
        .setColor(3066993)
        .setAuthor(channel.guild.name, channel.guild.iconURL)
        .setDescription(`${channel.name} kanalı oluşturuldu. _(sesli kanal)_`)
        .setFooter(`ID: ${channel.id}`);
      hgK.send({ embed });
    }
  });

  client.on("channelDelete", async channel => {
    const fs = require("fs");
    var kanal = await db.fetch(`modlogK_${channel.guild.id}`);

    const hgK = channel.guild.channels.find("name", kanal);
    if (!hgK) return;
    if (channel.type === "text") {
      let embed = new Discord.RichEmbed()
        .setColor(3066993)
        .setAuthor(channel.guild.name, channel.guild.iconURL)
        .setDescription(`${channel.name} kanalı silindi. _(metin kanalı)_`)
        .setFooter(`ID: ${channel.id}`);
      hgK.send({ embed });
    }
    if (channel.type === "voice") {
      let embed = new Discord.RichEmbed()
        .setColor(3066993)
        .setAuthor(channel.guild.name, channel.guild.iconURL)
        .setDescription(`${channel.name} kanalı silindi. _(sesli kanal)_`)
        .setFooter(`ID: ${channel.id}`);
      hgK.send({ embed });
    }
  });
});

/////----------------------------   GÜVENLİK ---------------------------------/////

client.on("guildMemberAdd", async member => {
  let user = client.users.get(member.id);
  let kanal = client.channels.get(db.fetch(`güvenlik_${member.guild.id}`));
  const Canvas = require("canvas");
  const canvas = Canvas.createCanvas(360, 100);
  const ctx = canvas.getContext("2d");

  const resim1 = await Canvas.loadImage(
    "https://media.discordapp.net/attachments/663473600795246602/673492641786101760/arkaplanengel.png?width=1080&height=676"
  );
  const resim2 = await Canvas.loadImage(
    "https://media.discordapp.net/attachments/663473600795246602/673490407770030140/arkaplan.png?width=1080&height=676"
  );
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment(kurulus).format("dddd");
  var kontrol;
  if (kurulus > 2629800000) kontrol = resim2;
  if (kurulus < 2629800000) kontrol = resim1;

  const background = await Canvas.loadImage(
    "https://media.discordapp.net/attachments/663473600795246602/664839892173586445/thumb-1920-83926.jpg?width=1080&height=676"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(kontrol, 0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
  ctx.clip();
  ctx.drawImage(avatar, 143, 10, 73, 72);

  const attachment = new Discord.Attachment(canvas.toBuffer(), "güvenlik.png");
  kanal.send(attachment);
});

/////----------------------------   GÜVENLİKSON ---------------------------------/////

/////---------------------------- TEST KOMUTU ---------------------------------/////         '
client.on("message", async message => {
  if (message.content === ".test") {
    message.channel.send("Test girişi yaptın");
    client.emit(
      "guildMemberAdd",
      message.member || (await message.guild.fetchMember(message.author))
    );
  }
});
/////---------------------------- TEST KOMUTU SON ---------------------------------/////

client.on("guildMemberAdd", member => {
  let stark = client.channels.get(db.fetch(`sohbetveoyun_${member.guild.id}`));
  const embed = new Discord.RichEmbed()
    .setTitle(client.users.get(member.id).username)
    .setDescription(
      "Hoşgeldin, seninle birlikte " + member.guild.memberCount + " kişiyiz!"
    )
    .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
    .setFooter("CyberHunter | TR", member.guild.iconURL);
  stark.send(embed);
});

client.on("guildMemberRemove", member => {
  let knl = client.channels.get(db.fetch(`sohbetveoyun_${member.guild.id}`));
  const embed = new Discord.RichEmbed()
    .setTitle(client.users.get(member.id).username)
    .setDescription(
      "Görüşürüz, sensiz " + member.guild.memberCount + " kişiyiz!"
    )
    .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
    .setFooter("CyberHunter | TR", member.guild.iconURL);
  knl.send(embed);
});

///////////////

client.on("channelDelete", async channel => {
  if (channel.guild.id !== "675439884940607489") return;
  const logs = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then(audit => audit.entries.first());
  const silen = await channel.guild.members.get(logs.executor.id);
  const logkanali = channel.guild.channels.find(
    abimiz => abimiz.id === "675459086804058173 "
  );
  channel
    .clone(undefined, true, true, "Kanal Koruma Sistemi")
    .then(async klon => {
      await klon.setParent(channel.parent);
      await klon.setPosition(channel.position);
      const embed = new Discord.RichEmbed()
        .setColor("GREEN")
        .setAuthor("Kanal Koruma Sistemim Bir Şey Farketti!")
        .setDescription(
          `**Dikkat!**\n **${channel.guild.name}** sunucusunda **${channel.name}** adında bir kanal silindi, fakat koruma sistemlerim sayesinde bu kanalı otomatikmen aynı şekilde yeniden oluşturdum.`
        )
        .setFooter("CyberHunter | TR - Kanal Koruma Sistemi");
      logkanali.send(embed);
    });
});

//////////////

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === settings.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(settings.token); ///////////////////////////dfsf
