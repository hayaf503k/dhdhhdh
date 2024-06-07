  const { Events } = require('discord.js');
  const client = require("../index");

  client.on(Events.ClientReady, (c) => {
    client.user.setActivity('Dev By Dark')
    client.user.setStatus('idle')
    console.log(`🤖 - ${client.user.username} is ready`)
    
})