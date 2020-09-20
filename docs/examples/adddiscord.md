# Adding Discord OAuth to the Server

Please make sure you have followed the Creating A Server tutorial. You are required to have finished that before adding Discord OAuth. 

### Creating a Discord App.

Firstly, head to [https://discord.com/developers/applications/me](https://discord.com/developers/applications/me).

From there, create a new application.

![Click on the "New Application" button.](https://cdn.discordapp.com/attachments/757009063333855263/757009076629536808/unknown.png)

Then, you can name the application whatever you would like it to be. After that, push "Create".

![Push "Create"](https://cdn.discordapp.com/attachments/757009063333855263/757009856233340968/unknown.png)

Now, you can set the picture that you would like users to see once they get to your OAuth.

![Set the picture and copy the Client Secret and Client ID.](https://cdn.discordapp.com/attachments/757009063333855263/757010433474297906/unknown.png)

After you have done that, save the Client ID and Client Secret, ready for us to put it into our code.

### Adding Discord to the Server

By now, you should also have your server setup done. 

Let's add our discord OAuth handler in.

```js
const express = require('express')
let app = express()
let oauth = require('smartoauth')
let DiscordClient = new oauth.Discord({
    client_secret: "",
    client_id: "",
    callback: "http://localhost:8080/login"
})

app.get("/", async(req,res) => {
    res.send(__dirname + 'path to your HTML FILE')
});

app.get("/login", async(req,res) => {
   // This is next!
});

app.listen(8080)
```
Make sure to fill in your Client Secret and Client ID Values, as well as the callback being the page you set. (/login was the example, but it can be changed to whatever you would like it to be!). The client secret is to be kept secret, so if you are hosting it on a platform that is not private (Glitch.com or Repl.it), make sure to add the client secret to your .env file.

From there, we can now handle a request.

```js
const express = require('express');
let app = express()
let oauth = require('smartoauth')
let DiscordClient = new oauth.Discord({
    client_secret: "",
    client_id: "",
    callback: "http://localhost:8080/login"
})

app.get("/", async(req,res) => {
    res.send(__dirname + 'path to your HTML FILE')
});

app.get("/login", async(req,res) => {
    let user = DiscordClient.getUserFromCode(req.query.code)
    console.log(user)
    console.log(user.username + user.discriminator)
    console.log(user.userid)
});

app.listen(8080)
```

We have now got the user from the code, although we are stuck with one problem...

The code can only be used once.

## Session Storing

The way to get around this problem is session storing. Make sure you have the [cookie-parser](https://www.npmjs.com/package/cookie-parser) package installed. 

Let's start by setting up the cookie parser.

```js
const express = require('express');
const cookieParser = require('cookie-parser'); 
let app = express()
let oauth = require('smartoauth')
let DiscordClient = new oauth.Discord({
    client_secret: "",
    client_id: "",
    callback: "http://localhost:8080/login"
})

app.use(cookieParser()); 

app.get("/", async(req,res) => {
    res.send(__dirname + 'path to your HTML FILE')
});

app.get("/login", async(req,res) => {
    let user = DiscordClient.getUserFromCode(req.query.code)
    console.log(user)
    console.log(user.username + user.discriminator)
    console.log(user.userid)
});

app.listen(8080)
```
From there, we can now set it up to get the token from the code, so that we can re-use the token.

For this simple example, we'll set it up so if there isn't a cookie, or if the token is invalid it will redirect you to the login page.

This does look crazy, but I decided to give it to you all in one go, instead of doing it in steps. 

```js
const express = require('express');
const cookieParser = require('cookie-parser'); 
let app = express()
let oauth = require('smartoauth')
let DiscordClient = new oauth.Discord({
    client_secret: "",
    client_id: "",
    callback: ""
})

DiscordClient.addScopes(['user']) // Add the "scope" of the oAuth link. More detail will come in a later tutorial.

app.use(cookieParser()); 

app.get("/", async(req,res) => {
    res.sendFile(__dirname + 'path to your HTML FILE')
});

app.get("/login", async(req,res) => {
    if (req.query.code) { // If there is a code...
        try { // Then TRY to get the token.
            DiscordClient.getToken(req.query.code).then(async token => {
                res.cookie('discordtoken', token.access_token) // If there is, set it as a cookie!
                console.log(`Set Cookie!`)
                DiscordClient.getUserFromToken(token.access_token).then(async user => { // Get the user from the token. :)
                    res.send(`Hello ${user.username}!`)
                })
            })
        }
        catch(err) { // If we error while getting the user, redirect back to the login page as it'll be an invalid token.
            res.redirect(DiscordClient.getURL()) 
        }
    } else { // If we don't have a code given...
        if (!req.cookies.discordtoken) { // And if there is no token stored...
            res.redirect(DiscordClient.getURL()) // Redirect to login.
        } else { // If there is a token.
            try {
                DiscordClient.getUserFromToken(req.cookies.discordtoken).then(async user => { // Get the user from the token
                    res.send(`Hello ${user.username}!`)
                })
            }
            catch(err) { // If that fails then...
                console.error(err)
                res.clearCookie('discordtoken') // Remove the token
                res.redirect(DiscordClient.getURL()) // Redirect back to login.
            }
        }
    }
});

app.listen(8080)
```

### End

I hope this tutorial has helped you start you DiscordOAuth journey. If you have any questions, you can DM me at Sasial#9375 on discord, or join the [SmartSystems](https://discord.gg/J7j4wJQ) discord server.