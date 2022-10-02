module.exports = (token, guild) => {
  const colors = require('colors');

  require('phin')({
    method: 'GET',
    parse: 'json',
    url: `https://discord.com/api/v9/guilds/${guild}/bans`,
    headers: { 'Authorization': `Bot ${token}` }
  }).then(res => {
    const body = res.body;
    body.forEach(async ban => {
      const resp = await require('phin')({
        method: 'DELETE',
        parse: 'json',
        url: `https://discord.com/api/v9/guilds/${guild}/bans/${ban.user.id}`,
        headers: { 'Authorization': `Bot ${token}` }
      });

      if ([200, 204].includes(res.statusCode)) {
        console.log(colors.green(`[!]; Unanned Member ${ban.user.username}`));
      } else console.log(colors.green(`[!]; Couldn't Unan ${ban.user.username}`));
    })
  })
}
