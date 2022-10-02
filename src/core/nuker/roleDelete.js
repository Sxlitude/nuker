module.exports = (token, guild) => {

  const { roles: roleSettings } = require('../../config.js');
  const { deleteExcept: notToDelete } = roleSettings;
  const colors = require('colors');

  require('phin')({
    method: 'GET',
    parse: 'json',
    url: `https://discord.com/api/v9/guilds/${guild}/roles`,
    headers: { 'Authorization': `Bot ${token}` }
  }).then(res => {

    res.body.forEach(async role => {

      if (!notToDelete.includes(role.id)) {
        const response = await require('phin')({
          method: 'DELETE',
          parse: 'json',
          url: `https://discord.com/api/v9/guilds/${guild}/roles/${role.id}`,
          headers: { 'Authorization': `Bot ${token}` }
        });

        if ([200, 201, 204].includes(response.statusCode)) {
          console.log(colors.green(`[!]; Deleted Role @${role.name}`));
        } else console.log(colors.red(`[!]; Couldn't Delete @${role.name} [${response.statusCode}]`));
      }
    })
  })
}
