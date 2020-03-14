const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Yeterli Yetkin yokmuş gibi görünüyor.`);
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send('Herhangi bir şey yazmalısın. **Örnek:** ``.yaz Selam Kanki``')
  message.delete()
  
    const embed = new Discord.RichEmbed()
    

    message.channel.send(`${mesaj}`)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yaz',
    description: 'Bota yazı yazdırır.',
      category: 'Ekstra'
};