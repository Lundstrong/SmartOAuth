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
    constructor(Config) {
        this.create(Config)
    }
    create(data) {
        if ('login' in data) {
            /**
             * The username of the user
             * @type {string}
             * @name User#username
             */
            this.username = data.login;
        } else if (typeof this.username !== 'string') {
            this.username = null;
        }
        if ('id' in data) {
            /**
             * The id of the user
             * @type {Number}
             * @name User#userid
             */
            this.userid = data.id;
        } else if (typeof this.userid !== 'Number') {
            this.userid = null;
        }
        if ('avatar_url' in data) {
            /**
             * The URL to the avatar of the user
             * @type {string}
             * @name User#avatar
             */
            this.avatar = data.avatar_url;
        } else if (typeof this.avatar !== 'string') {
            this.avatar = null;
        }
        if ('bio' in data) {
            /**
             * The bio of the user.
             * @type {Number}
             * @name User#bio
             */
            this.bio = data.bio;
        } else if (typeof this.bio !== 'Number') {
            this.bio = null;
        }
        if ('two_factor_authentication' in data) {
            /**
             * If the user has two factor/muti factor authentication on.
             * @type {Boolean}
             * @name User#mfa
             */
            this.mfa = data.two_factor_authentication;
        } else if (typeof this.mfa !== 'Boolean') {
            this.mfa = null;
        }
        if ('location' in data) {
            /**
             * The location the user has set themselves to be shown as.
             * @type {string}
             * @name User#location
             */
            this.location = data.location;
        } else if (typeof this.location !== 'string') {
            this.location = null;
        }
        if ('email' in data) {
            /**
             * The email the user has set themselves to have.
             * @type {string}
             * @name User#email
             */
            this.email = data.email;
        } else if (typeof this.email !== 'string') {
            this.email = null;
        }
        if ('twitter_username' in data) {
            /**
             * The Twitter Username the user has set themselves to have.
             * @type {string}
             * @name User#twitter
             */
            this.twitter = data.twitter_username;
        } else if (typeof this.twitter !== 'string') {
            this.twitter = null;
        }
        if ('plan' in data) {
            /**
             * The 
             * @type {Object}
             * @name User#plan
             */
            this.plan = data.plan;
        } else if (typeof this.plan !== 'Object') {
            this.plan = null;
        }
        if ('public_repos' in data && 'owned_private_repos' in data) {
            /**
             * The repos the user owns.
             * @type {Object}
             * @name User#repos
             */
            this.repos = {
                public: data.public_repos,
                private: data.owned_private_repos
            };
        } else if (typeof this.repos !== 'Object') {
            this.repos = null;
        }
        if ('public_gists' in data && 'private_gists' in data) {
            /**
             * The repos the user owns.
             * @type {Object}
             * @name User#gists
             */
            this.gists = {
                public: data.public_gists,
                private: data.private_gists
            };
        } else if (typeof this.gists !== 'Object') {
            this.gists = null;
        }
    }
}
module.exports = GithubUser
