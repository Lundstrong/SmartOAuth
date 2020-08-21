const {
    get,
    post
} = require('axios')
const query = require('querystring')
const GithubUser = require('./githubuser')

/**
 *
 *
 * @class Github
 * Represents the class for a github-based-oauth.
 */
class GitHub {
    /**
     * Creates an instance of the Github-based OAuth Client.
     *
     * @param {Object} Config - A JSON with the configuration for the github oauth.
     */
    constructor(Config) {
        if (!Config || !Config.client_secret || !Config.client_id || !Config.callback) throw new Error('Please provide a config.')
        this.Config = Config
    }

    /**
     * This function gives the ability to get a User's token. This is not to be confused with GetUserFromToken/GetUserFromCode.
     *
     * @param {String} code - The code provided with the discord callback.
     * @returns {String} The User's token.
     * @memberof GitHub
     */
    async getToken(code) {
        if (!code) throw new Error('Provide a code.')

        const data = await post('https://github.com/login/oauth/access_token', query.stringify({
            client_id: this.Config.client_id,
            client_secret: this.Config.client_secret,
            code: code,
            redirect_uri: this.Config.callback
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }).catch(err => {
            if (err.response.status === 400) return
        })

        if (data) {
            if (data.data.error) {
                throw new Error(data.data.error + " (" + data.data.error_description + ")")
            } else {
                return data.data
            }
        } else throw new Error('Invalid code.')
    }

    /**
     * This functions gives the ability to get information about the user from the TOKEN. You may want to use GetUserFromCode instead.
     *
     * @param {String} token  - The code provided with the GitHub callback.
     * @returns {GithubUser} An Object is retured which shows the username, ID, avatar and more.
     * @memberof GitHub
     */

    async getUserFromToken(token) {
        if (!token) throw new Error('Provide a token.')
        var user
        try {
            user = await get('https://api.github.com/user', {
                headers: {
                    Authorization: `token ${token}`
                }
            })
        } catch (err) {
            console.error(err)
        }
        return new GithubUser(user.data)
    }
     /**
     * This functions gives the ability to get information about the user from the callback CODE. You may want to use GetUserFromToken instead.
     *
     * @param {String} code  - The code provided with the github callback.
     * @returns {GithubUser} An Object is retured which shows the username, ID, avatr and more.
     * @memberof GitHub
     */
    async getUserFromCode(code) {
        if (!code) throw new Error('Provide a code.')

        const data = await post('https://github.com/login/oauth/access_token', query.stringify({
            client_id: this.Config.client_id,
            client_secret: this.Config.client_secret,
            code: code,
            redirect_uri: this.Config.callback
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }).catch(err => {
            if (err.response.status === 400) return
        })

        if (data) {
            if (data.data.error) {
                throw new Error(data.data.error + " (" + data.data.error_description + ")")
            }
        } else throw new Error('Invalid code.')
        var user
        try {
            user = await get('https://api.github.com/user', {
                headers: {
                    Authorization: `token ${data.data.access_token}`
                }
            })
        } catch (err) {
            console.error(err)
        }
        return new GithubUser(user.data)
    }
}

module.exports = GitHub
