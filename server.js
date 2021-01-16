// Irrigation server running on 192.168.0.99 port 80
// for this reason Node needs to be run with `sudo`
// sudo node ./app.js

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.static('api'));
app.use(express.static('c'));

// Driver file import
const relay = require("./api/relay")

//CONTROLERS ------------------------------------------------------------
app.get("/", (req, res) => {
   res.sendFile("index.html");
});

app.get('/activate/:relayNum', (req, res) => {
   relay.activateRelay(req)
      .then((result) => { res.send(result.msg) })
      .catch((reason) => { res.status(500).end("No good " +  reason.msg) })
});

app.get('/status/:relayNum', (req, res) => {
   relay.checkStatus(req)
      .then((result) => { res.send(result.msg) })
      .catch(() => { res.status(500) })
})
//----------------------------------------------------------------------


// SERVER start
app.listen(80, () => {
   console.log("Server started on IP 192.168.0.99 port 80");
});