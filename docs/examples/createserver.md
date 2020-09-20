# Creating A Server

To start use to SmartOAuth, we suggest to learn the basics by creating an [express](https://npmjs.com/package/express) server.

This can be done by using this simple scalfold.

```js
const express = require('express')
let app = express()
```

From there, we can now run a basic server

```js
const express = require('express')
let app = express()

app.get("/", async(req,res) => {
    res.send(__dirname + 'path to your HTML FILE')
});

app.listen(8080)
```

Finally, our last step is to create a callback. This will be used later. You can change /login to whatever you like.
```js
const express = require('express')
let app = express()

app.get("/", async(req,res) => {
    res.send(__dirname + 'path to your HTML FILE')
});

app.get("/login", async(req,res) => {
   // See the other pages for handling the login
});

app.listen(8080)
```
