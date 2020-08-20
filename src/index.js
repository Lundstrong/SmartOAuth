module.exports = {
  // Auth Classes
  Discord: require('./discord/discordauth.js'),

  Github: require('./github/githubauth.js'),
  GithubUser: require('./github/githubuser.js'),
  // Util
  Version: require('../package.json').version
}
