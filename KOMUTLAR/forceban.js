const Discord = require('discord.js');

	exports.run = async (client, message, args, level) => { /// eslint-disable-line no-unused-vars
    
    let iptal = client.emojis.get("656152938338844673");
    let member = args[0];
	if (isNaN(member)) return message.reply(`${iptal} Bir kullanıcı **ID'si** girmelisiniz!`);

	const sebep = args.splice(1, args.length).join(' ') || `Sebebi yok!`;

	message.guild.ban(member, sebep+" | Yetkili: "+message.author.tag).then(() => {
		message.channel.send(`\`${member}\`, ${sebep} nedeniyle **banlandı!** | Sebebi ise ***${sebep}***`);
		    
  })
			.catch((err) => {
				console.log(err);
			});
	

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 4
};

exports.help = {
	name: 'forceban',
	category: 'moderatör',
	description: 'sunucuda değilken banlarsın!',
	usage: 'forceban '
};