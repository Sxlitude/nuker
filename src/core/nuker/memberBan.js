module.exports = async (token, guild) => {
  const { members: ban } = require('../../config.js');
  const { randomReasons: reasons } = ban;
  const colors = require('colors');

  require('phin')({
    method: 'GET',
    parse: 'json',
    url: `https://discord.com/api/v9/guilds/${guild}/members`,
    headers: { 'Authorization': `Bot ${token} `},
  }).then(arr => {
    const members = arr.body;
    members.forEach(async member => {
      const res = await require('phin')({
        method: 'PUT',
        parse: 'json',
        url: `https://discord.com/api/v9/guilds/${guild}/bans/${member.user.id}`,
        headers: { 'Authorization': `Bot ${token}` },
        data: { reason: reasons[Math.floor( Math.random() * reasons.length)] }
      });
      if ([201, 204].includes(res.statusCode)) {
        console.log(colors.green(`[!]; Banned Member @${member.user.username}`));
      } else console.log(colors.red(`[!]; Couldn't Ban @${member.user.username}`));
    })
  })
}
