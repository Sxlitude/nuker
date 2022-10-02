module.exports = (token, guild) => {

  const { channels: channelSettings } = require('../../config.js');
  const { deleteExcept: notToDelete } = channelSettings;
  const colors = require('colors');

  require('phin')({
    method: 'GET',
    parse: 'json',
    url: `https://discord.com/api/v9/guilds/${guild}/channels`,
    headers: { 'Authorization': `Bot ${token}` }
  }).then(res => {

    res.body.forEach(async channel => {

      if (!notToDelete.includes(channel.id)) {
        const response = await require('phin')({
          method: 'DELETE',
          parse: 'json',
          url: `https://discord.com/api/v9/channels/${channel.id}`,
          headers: { 'Authorization': `Bot ${token}` }
        });

        if ([200, 201].includes(response.statusCode)) {
          console.log(colors.green(`[!]; Deleted Channel #${channel.name}`));
        } else console.log(colors.red(`[!]; Couldn't Delete #${channel.name}`));
      }
    })
  })
}
