/**
 *
 *
 * @class GithubUser
 * Represents the class for a github-oauth User.
 */
class GithubUser {
  /**
   * Creates an instance of the Github-based OAuth Client.
   *
   * @param {Object} Config - The data of the user.
   */
  constructor (Config) {
    this.create(Config)
  }

  create (data) {
    if ('login' in data) {
      /**
       * @type {string} username - The username of the user
       */
      this.username = data.login
    } else if (typeof this.username !== 'string') {
      this.username = null
    }
    if ('id' in data) {
      /**
       * @type {number} userid - The id of the user
       */
      this.userid = data.id
    } else if (typeof this.userid !== 'number') {
      this.userid = null
    }
    if ('avatar_url' in data) {
      /**
       * @type {string} avatar - The URL to the avatar of the user
       */
      this.avatar = data.avatar_url
    } else if (typeof this.avatar !== 'string') {
      this.avatar = null
    }
    if ('bio' in data) {
      /**
       * @type {string} bio - The bio of the user.
       */
      this.bio = data.bio
    } else if (typeof this.bio !== 'string') {
      this.bio = null
    }
    if ('two_factor_authentication' in data) {
      /**
       * @type {boolean} mfa - If the user has two factor/muti factor authentication on.
       */
      this.mfa = data.two_factor_authentication
    } else if (typeof this.mfa !== 'boolean') {
      this.mfa = null
    }
    if ('location' in data) {
      /**
       * @type {string} location - The location the user has set themselves to be shown as.
       */
      this.location = data.location
    } else if (typeof this.location !== 'string') {
      this.location = null
    }
    if ('email' in data) {
      /**
       * @type {string} email - The email the user has set themselves to have.
       */
      this.email = data.email
    } else if (typeof this.email !== 'string') {
      this.email = null
    }
    if ('twitter_username' in data) {
      /**
       * @type {string} twitter - The Twitter Username the user has set themselves to have.
       */
      this.twitter = data.twitter_username
    } else if (typeof this.twitter !== 'string') {
      this.twitter = null
    }
    if ('plan' in data) {
      /**
       * @type {Object} plan - The Github plan the user is on.
       */
      this.plan = data.plan
    } else if (typeof this.plan !== 'object') {
      this.plan = null
    }
    if ('public_repos' in data && 'owned_private_repos' in data) {
      /**
       * @type {Object} repos - The repos the user owns.
       */
      this.repos = {
        public: data.public_repos,
        private: data.owned_private_repos
      }
    } else if (typeof this.repos !== 'object') {
      this.repos = null
    }
    if ('public_gists' in data && 'private_gists' in data) {
      /**
       * @type {Object} gists - The repos the user owns.
       */
      this.gists = {
        public: data.public_gists,
        private: data.private_gists
      }
    } else if (typeof this.gists !== 'object') {
      this.gists = null
    }
  }
}
module.exports = GithubUser
