const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const voiceChannels = message.guild.channels.filter(c => c.type === "voice");
  let count = 0;

  for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;
  const emoji = client.emojis.find(emoji => emoji.name === "tik");

  const umutembed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor("📊 Sunucu Üye Durumu 📥")
    .setDescription(`**🔊 Ses Kanallarında \`${count}\` Kişi Bulunmaktadır!\n📶 Sunucuda \`${message.guild.memberCount}\` Kişi Bulunmaktadır!\n Kişi Bulunmaktadır!**`)
    .setThumbnail(
      "https://cdn.discordapp.com/avatars/634153978883604481/2f0d3f871fbd02991e940fb2bc849cc5.png?size=2048"
    )
    .setTimestamp();

  message.channel.sendEmbed(umutembed);
  message.react(emoji);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "say",
  description: "Sunucudaki ve Ses Kanallarındaki Kişi Sayısını Gösterir! Tagdakileri Sayar! ",
  usage: "say"
};