const Discord = require('discord.js');
exports.run = (client, message) => {
const random = Math.floor(Math.random() * 100) + 1
const emoji = (client.emojis.find("name", "aga_yak_yak"))
message.channel.send(`${emoji} Efkarınız %${random} Aga bee ${emoji}`)
}

exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0
}
exports.help = {
name: 'efkar-ölçer',
description: 'Efkar Ölçer ',
usage: 'efkar-ölçer'
};