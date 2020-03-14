exports.run = async(client, message, args) => {
  let user = message.mentions.users.first() || message.author;
  if(!user) return message.channel.send("Ooo Kanka Naptın Ayıptır Birini Etiketlede Beraber Bakak Laa. :D")
 let invites = await message.guild.fetchInvites() 
  let esrar = invites.array().find(invite => invite.inviter.id === user.id) ? invites.find(invite => invite.inviter.id === user.id).uses : 0

message.channel.send(`Heyy Kankam Senin Tam Olarak ⚡**${esrar}**⚡ Davetin Var!`)

};
exports.conf = {
  aliases: []
}
exports.help = {
  name: "davetim",
  usage: "davetim"
};