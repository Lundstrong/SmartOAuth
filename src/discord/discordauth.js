const {
  get,
  post
} = require('axios')
const query = require('querystring')
const DiscordUser = require('./discorduser.js')

/**
 *
 *
 * @class Discord
 * Represents the class for a discord-oauth.
 */
class Discord {
  /**
   * Creates an instance of the DiscordOAuth Client.
   *
   * @param {Object} Config - A JSON with the configuration for the discord oauth.
   */
  constructor (Config) {
    if (!Config || !Config.client_secret || !Config.client_id || !Config.callback) throw new Error('Please provide a config.')
    this.Config = Config
  }

  /**
   * This function gives the ability to get a User's token. This is not to be confused with GetUser.
   *
   * @param {String} code - The code provided with the discord callback.
   * @returns {String} The User's token.
   * @memberof Discord
   */
  async getToken (code) {
    if (!code) throw new Error('Provide a code.')

    const data = await post('https://discord.com/api/v7/oauth2/token', query.stringify({
      client_id: this.Config.client_id,
      client_secret: this.Config.client_secret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this.Config.callback
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).catch(err => {
      if (err.response.status !== 400) console.err(err)
    })

    if (data) {
      return data.data
    } else throw new Error('Invalid code.')
  }

  /**
   * This functions gives the ability to get information about the user from the code.
   *
   * @param {String} code  - The code provided with the discord callback.
   * @returns {DiscordUser} The DiscordUser class is retured which shows the users, ID, profile picture and Nitro status.
   * @memberof Discord
   */
  async getUserFromCode (code) {
    if (!code) throw new Error('Provide a code.')

    const data = await post('https://discord.com/api/v7/oauth2/token', query.stringify({
      client_id: this.Config.client_id,
      client_secret: this.Config.client_secret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this.Config.callback
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).catch(err => {
      if (err.response.status !== 400) console.err(err)
    })
    if (!data) return 'Invalid Code'

    const user = await get('https://discordapp.com/api/v7/users/@me', {
      headers: {
        Authorization: `Bearer ${data.data.access_token}`
      }
    })
    return new DiscordUser(user.data)
  }

  /**
   * This functions gives the ability to get information about the user from the code.
   *
   * @param {String} token  - The token is provided using the getToken method.
   * @returns {DiscordUser} The DiscordUser class is retured which shows the users, ID, profile picture and Nitro status.
   * @memberof Discord
   */
  async getUserFromToken (token) {
    const user = await get('https://discordapp.com/api/v7/users/@me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return new DiscordUser(user.data)
  }
}

module.exports = Discord
