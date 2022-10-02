const prompt = require('prompt-sync')();
const colors = require('colors');
const Vars = require('../config.js');

module.exports = {

  /* Check the Bot Token */
  checkToken: async (token) => {
    const res = await require('phin')({
      method: 'GET',
      parse: 'json',
      url: 'https://discord.com/api/v9/users/@me',
      headers: { 'Authorization': ` Bot ${token}` }
    });

    if (res.statusCode === 200) return true;
    else return false;
  },

  /* Check Guild Validity */
  checkGuild: async (token) => {
    const id = Vars.bot.guildID || prompt(colors.brightYellow('[?]; Enter Guild ID :: '));
    const res = await require('phin')({
      method: 'GET',
      parse: 'json',
      url: `https://discord.com/api/v9/guilds/${id}`,
      headers: { 'Authorization': `Bot ${token}` }
    });

    if (res.statusCode === 200) return id;
    else return false;
  },

  /* Logger Functions */
  logger: {
    invalidToken: () => {
      console.log(colors.red('[!]; The Bot token you provided is invalid.'))
    },

    validToken: () => {
      console.log(colors.green('[!]; The Bot token is valid.'))
    },

    invalidGuild: () => {
      console.log(colors.red('[!]; The Guild ID you provided is invalid.'))
    },

    showMenu: () => {
      console.log(colors.magenta(`\n==========\n[1]: Create Channels\n[2]: Delete Channels\n[3]: Create Roles\n[4]: Delete Roles\n[5]: Ban Members\n[6]: Unban Members\n[7]: Community Spam\n[8]: Mass Ping\n==========\n`));
      const option = prompt(colors.brightRed(`[?]; Your Option :: `))
      return option;
    }
  }
}
