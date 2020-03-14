const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const settings = require("../ayarlar.json");

var prefix = settings.prefix;

module.exports = client => {
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: Aktif, Komutlar yüklendi!`
  );
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: ${
      client.user.username
    } ismi ile giriş yapıldı!`
  );
  client.user.setStatus("dnd");
   //idle = boşta
  //dnd = rahatsız etmeyin
  //online = çevrimiçi
  client.user.setGame(`🎄 CyberHunter DC'sini izliyorum + .yardım 🎄`,"https://www.twitch.tv/teamardatr");
  //LISTENING = DİNLİYOR
  //WATCHING = İZLİYOR
  //PLAYING = OYNUYOR
  console.log(`Eh Be Uşağum Sonunda Aktif Ettin Beni`);
};
