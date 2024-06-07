//======================== EXPRESS ===========================//
const express = require('express');
const app = express();
app.listen(() => console.log(('General Progs Help you every time ↗️ ')));
app.use('/', (req, res) => {  res.send("<center><h1>Bot online 24H</h1></center>");
});
//============================================================//
const { Client, GatewayIntentBits, Collection } = require('discord.js')
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ]
})

client.on('ready', () => {
  console.log(`🌟 - Made by General Progs \n🌟 - https://discord.gg/g-p`)
})

const fs = require('fs')

client.slashCommands = new Collection();

client.Çɱɗ = new Collection()

client.Çʍɗ = new Collection()

client.PREFIX = '#'

module.exports = client;

fs.readdirSync('./handlers').forEach((handler) => {
  require(`./handlers/${handler}`)(client);
})

client.login(process.env.generalp)

//============================================ [ERRORS RETURN ] ===============================================//
process.on("uncaughtException", (error) => {
  console.log(`⚠️ - Error : `, error)
  return;
})

process.on("unhandledRejection", (error) => {
  console.log(`⚠️ - Error : `, error)
  return;
})

process.on("rejectionHandled", (error) => {
  console.log(`⚠️ - Error : `, error)
  return;
})
//============================================ [ERRORS RETURN ] ===============================================//