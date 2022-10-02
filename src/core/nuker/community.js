module.exports = async (token, guild) => {
  const colors = require('colors');
  for (var x = 0; x < 5; x++) {
    require('phin')({
      method: 'PATCH',
      parse: 'json',
      url: `https://discord.com/api/v9/guilds/${guild}`,
      headers: { 'Authorization': `Bot ${token}` },
      data: {
        features: ["COMMUNITY"],
        preferred_locale: 'en-US',
        rules_channel_id: '1',
        public_updates_channel_id: '1'
      }
    }).then(res => {
      // Status Code 403 says that community feature is temporarily disabled, but it still works.
      if ([200, 201, 403].includes(res.statusCode)) {
        console.log(colors.green(`[!]; Enabled/Disabled Community`));
      } else console.log(colors.red(`[!]; Failed to do community flooding`));
    })
  }
}
