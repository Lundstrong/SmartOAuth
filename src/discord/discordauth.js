const { get, post } = require('axios');
const query = require('querystring');

class oAuth {
  constructor(Config) {
    if (!Config || !Config.client_secret || !Config.client_id || !Config.callback) throw new Error('Please provide a config.');
    this.Config = Config;
  }
  async getToken(code) {
    if (!code) throw new Error('Provide a code.');

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
      if (err.response.status === 400) return;
    });

    if (data) {
      return data.data;
    } else return 'Invalid code.';
  }
  async getUser(code) {
    if (!code) throw new Error('Provide a code.');

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
      if (err.response.status === 400) return;
    });
    if (!data) return 'Invalid Code';

    const user = await get('https://discordapp.com/api/v7/users/@me', {
      headers: {
        'Authorization': `Bearer ${data.data.access_token}`
      }
    });
    return user.data;
  }
}

module.exports = oAuth;