const Discord = require('discord.js');

exports.run = async(client, message, args, ops, member) => {
            if (message.channel.type === "dm") return;  
    const emoji = (client.emojis.find("name", "tik99"))
    let verifyroless = message.guild.roles.find(`id`, "675460462405746739");
    if (!message.member.roles.find("id", "675460462405746739")) {
        return message.channel.send(`Bu Komutu Kullanmak için ✬ Angel Bot Komut Rolüne Sahip Olman Lazım `) 
    }

    let toverify = message.guild.member(message.mentions.users.first());
    let vUser = message.guild.member(message.mentions.users.first());
    let user = message.mentions.users.first();
   message.react(emoji);
    vUser.addRole('675463950007009300')
    vUser.addRole('675445864310898699')
    vUser.removeRole('678600286213898251')


  
  let embed = new Discord.RichEmbed() 
  .setColor('#01fce4')
  .setDescription( `${vUser} adlı Kullanıcıya <@&675463950007009300> | <&675445864310898699> adlı rol verildi.${emoji}`)
  message.channel.send(embed).then(msg => msg.delete(10000));

const sChannel = message.guild.channels.find(c=> c.id ==="675663729400217622")
  let modlog = new Discord.RichEmbed() 
  .setColor('#01fce4')
    .setDescription( `${vUser} adlı Kullanıcıya <@&675463950007009300> | <&675445864310898699> adlı rol verildi.${emoji} \n\n İşlemi Gerçekleştiren Yetkili : ${message.author.tag} ${emoji}`)
.setFooter(`TeamArdaTR`)
   sChannel.send(modlog)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kız'],
};

exports.help = {
  name: 'kadın',
  description: 'Kullanıcı İçin Doğrulandı Rolünü Verir.',
  usage: 'kadın'
};