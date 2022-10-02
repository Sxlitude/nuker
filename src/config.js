module.exports = {

  /* Optional Bot Config */
  bot: {
    token: null,
    guildID: null
  },
  
  /* MassChannel Configs */
  channels: {
    amount: 8,
    deleteExcept: ['1025793217347723354', '1025789615925370951'],
    randomNames: [ 'nuked', 'wizzed', 'lmfao', 'nice' ]
  },

  /* MassRole Config */
  roles: {
    amount: 5,
    deleteExcept: [],
    randomNames: [ 'nuked', 'destroyed', 'wizzed' ]
  },

  /* MassBan Config */
  members: {
    banIDs: false,
    banExcept: [],
    randomReasons: [ 'unfortunate ban', 'guild got nuked gg', 'get rekt' ]
  },

  /* Massping Config */
  massping: {
    names: ['nuked', 'raided'],
    messages: ['@everyone nuked', '@here raided']
  }
}
