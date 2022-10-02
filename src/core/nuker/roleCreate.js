module.exports = (token, guild) => {

  const { roles: roleSettings } = require('../../config.js');
  const { randomNames: names } = roleSettings;
  const { amount: limit } = roleSettings;
  const colors = require('colors');

  for (x = 0; x < limit; x++) {
    const name = names[Math.floor(Math.random() * names.length)];
    require('phin')({
      method: 'POST',
      parse: 'json',
      url: `https://discord.com/api/v9/guilds/${guild}/roles`,
      headers: { 'Authorization': `Bot ${token}` },
      data: {
        name: name
      }
    }).then(res => {

      if ([200, 201].includes(res.statusCode)) {
        console.log(colors.green(`[!]; Created Role @${name}`));
      }
      else console.log(colors.red(`[!]; Couldn't Create @${name}`));
    })
  }
}
