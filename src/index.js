const Methods = require('./core/func.js');
const Vars = require('./config.js');

const token = Vars.bot.token || require('prompt-sync')()('Enter Bot token :: ');

Methods.checkToken(token).then(async bool => {
  if (bool === false) Methods.logger.invalidToken();
  else {
    Methods.logger.validToken();
    const exists = await Methods.checkGuild(token)
    if (!exists) Methods.logger.invalidGuild();
      
    else {
      const option = Methods.logger.showMenu();
      if (option === '1') require('./core/nuker/channelCreate.js')(token, exists);
      else if (option === '2') require('./core/nuker/channelDelete.js')(token, exists);
      else if (option === '3') require('./core/nuker/roleCreate.js')(token, exists);
      else if (option === '4') require('./core/nuker/roleDelete.js')(token, exists);
      else if (option === '5') require('./core/nuker/memberBan.js')(token, exists);
      else if (option === '6') require('./core/nuker/memberUnban.js')(token, exists);
      else if (option === '7') require('./core/nuker/community.js')(token, exists);
      else if (option === '8') require('./core/nuker/massMention.js')(token, exists);
    }
  }
});
