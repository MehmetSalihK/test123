

const Discord = require('discord.js');
const ms = require("ms");

exports.run = (client, message, args) => {
      const e1 = (client.emojis.find("name", "hyqe_squad"))

              if (message.channel.type === "dm") return;  
    if (!message.member.hasPermissions("MUTE_MEMBERS")) return message.channel.send(":no_entry: Bu komutu kullanabilmek için `Üyeleri sustur` yetkisine sahip olmanız gerek.")
    let kullanici = message.mentions.members.first()
    
    let süre = args[1]
    let sebep = args[2]
    if (!süre) return message.reply("Süre belirtmelisin.")
    if (!kullanici) return message.channel.send("Kimi susturacağını belirtmedin.")
    kullanici.setMute(true, `Susturan yetkili: ${message.author.tag} - Susturma süresi: ${süre}ms`)
        .then(() =>
            message.channel.send(` ${e1}${kullanici} Adlı Kullanıcı**"${süre}"** süresi boyunca  **"${sebep}"** sebebiyle ses kanallarında susturuldu.`))
        .catch(console.error);
        setTimeout(() => {

        kullanici.setMute(false,`Süresi dolduğu için susturması kaldırıldı.`)
        message.channel.send(` ${e1} ${kullanici} Adlı Kullanıcının Süresi dolduğu için mikrofon açıldı. `)

const sChannel = message.guild.channels.find(c=> c.id ==="675454306434154559")
  let modlog = new Discord.RichEmbed() 
  .setColor('#01fce4')
    .setDescription( `${e1} ${kullanici} adlı kullanıcı ses kanallarında  **"${sebep}"** sebebiyle  **"${süre}"** süresi boyunca mutelendi  \n ${e1} Muteleyen yetkili : ${message.author.tag} `)
.setFooter(`Diksiyon Log`)
   sChannel.send(modlog)
    }, ms(süre))
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'sesmute',
    description: 'Ping was here',
    usage: "sesmute"
};