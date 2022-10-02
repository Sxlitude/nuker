module.exports = (token, guild) => {
  const colors = require('colors');
  const { massping: mp } = require('../../config.js');
  const { messages: msgs } = mp;
  const { names: name } = mp;

  require('phin')({
    method: 'GET',
    parse: 'json',
    url: `https://discord.com/api/v9/guilds/${guild}/channels`,
    headers: { 'Authorization': `Bot ${token}` }
  }).then(res => {

    const channels = res.body;
    channels.forEach(async channel => {
      const res = await require('phin')({
        method: 'POST',
        parse: 'json',
        url: `https://discord.com/api/v9/channels/${channel.id}/webhooks`,
        headers: { 'Authorization': `Bot ${token}` },
        data: { name: name[Math.floor(Math.random() * name.length)] }
      });

      const wh = res.body;
      if (wh.code === 20029) {
        console.log(colors.red(`[!]; Guild Rate Limit Reached, retry in ${webhooks[0].retry_after}s`));
      } else {
        for (var x = 0; x < 10; x++) {
          const resp = await require('phin')({
            method: 'POST',
            parse: 'json',
            url: `https://discord.com/api/v9/webhooks/${wh.id}/${wh.token}`,
            headers: { 'Authorization': `Bot ${token}` },
            data: { content: msgs[Math.floor(Math.random() * msgs.length)] }
          });
          if ([201, 204].includes(resp.statusCode)) {
            console.log(colors.green(`[!]; Spammed Webhook in #${channel.name}`));
          } else console.log(colors.red(`[!]; Couldn't Spam in #${channel.name} [${resp.body.message}]`));

        }
      }
    })
  })
}
