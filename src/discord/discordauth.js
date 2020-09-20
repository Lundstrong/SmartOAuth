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
    /**
     * @type {String[]} The scopes set.
     */
    this.Scopes = []
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

    const user = await get('https://discord.com/api/v7/users/@me', {
      headers: {
        Authorization: `Bearer ${data.data.access_token}`
      }
    })
    return new DiscordUser(user.data)
  }

  /**
   * This functions gives the ability to get information about the user from the token.
   *
   * @param {String} token  - The token is provided using the getToken method.
   * @returns {DiscordUser} The DiscordUser class is retured which shows the users, ID, profile picture and Nitro status.
   * @memberof Discord
   */
  async getUserFromToken (token) {
    const user = await get('https://discord.com/api/v7/users/@me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return new DiscordUser(user.data)
  }

  /**
   * This functions gives the ability to set the scopes for the redirect URL for discord.
   *
   * @param {String[]} Scopes - The scopes to add.
   * @returns {String[]} The scopes that are currently added.
   * @memberof Discord
   */
  async addScopes (scopes) {
    const allowedscopes = ['user', 'email', 'guilds', 'connections', 'guilds.join', 'bot']
    scopes.forEach(value => {
      if (allowedscopes.includes(value)) {
        this.Scopes.push(value)
      }
    })
  }

  /**
   * This functions gives the ability to get the redirect URL for discord.
   *
   * @returns {String} The URL to use for redirection.
   * @memberof Discord
   */
  async getURL () {
    const url = `https://discord.com/api/oauth2/authorize?client_id=${this.Config.client_id}&redirect_uri=${this.Config.callback}&response_type=code&scope=${this.Scopes.join(' ')}`
    return url
  }
}

module.exports = Discord
