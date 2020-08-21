/**
 *
 *
 * @class DiscordUser
 * Represents the class for a DiscordOAuth User.
 */
class DiscordUser {
    /**
     * Creates an instance of the Github-based OAuth Client.
     *
     * @param {Object} Config - The data of the user.
     */
    constructor(Config) {
        this.create(Config)
    }
    create(data) {
        if ('id' in data) {
            /**
             * @property {string} userid - The username of the user
             */
            this.userid = data.id;
        } else if (typeof this.userid !== 'string') {
            this.userid = null;
        }
        if ('username' in data) {
            /**
             * @property {string} username - The username of the user
             */
            this.username = data.username;
        } else if (typeof this.username !== 'string') {
            this.username = null;
        }
        if ('discriminator' in data) {
            /**
             * @property {string} discriminator - The discriminator of the user.
             */
            this.discriminator = data.discriminator;
        } else if (typeof this.discriminator !== 'string') {
            this.discriminator = null;
        }
        
        if ('avatar' in data) {
            /**
             * @property {string} avatar - User's avatar..
             */
            this.avatar = data.avatar;
        } else if (typeof this.avatar !== 'string') {
            this.avatar = null;
        }
        
        if ('bot' in data) {
            /**
             * @property {boolean} bot - If the user is a bot.
             */
            this.bot = data.bot;
        } else if (typeof this.bot !== 'boolean') {
            this.bot = null;
        }

        if ('mfa_enabled' in data) {
            /**
             * @property {boolean} mfa - If the user has two factor/muti factor authentication on.
             */
            this.mfa = data.mfa_enabled;
        } else if (typeof this.mfa !== 'boolean') {
            this.mfa = null;
        }

        if ('locale' in data) {
            /**
             * @property {string} locale - What language the user has set.
             */
            this.locale = data.locale;
        } else if (typeof this.locale !== 'string') {
            this.locale = null;
        }
        if ('verified' in data) {
            /**  
             * @property {boolean} verified_email - Whether the user's email has been verified 
            */
           this.verified_email = data.verified
        } else if (typeof this.verified_email !== 'boolean') {
            this.verified_email = null;
        }
    }
}
module.exports = DiscordUser
