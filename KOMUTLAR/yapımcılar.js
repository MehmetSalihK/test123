const Discord = require('discord.js')

exports.run = async (client, message, params) => {

const sup = new Discord.RichEmbed()
.addField(`${client.emojis.get("655889156198760468")} **CyberHunter | TR Yapımcıları:** \n`, `${client.emojis.get("656873720396251137")} | Yapımcı: <@660880293271437352>\n${client.emojis.get("656151810964324374")} | Geliştirici: <@660880293271437352>`)
.setColor("RANDOM")
.setFooter(`CyberHunter | TR - Yapımcı Sistem`, client.user.avatarURL)

message.channel.send(sup);

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yapımcım',
  description: 'yapımcıları atar.',
  usage: 'yapımcım'
};