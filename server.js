// Irrigation server running on 192.168.0.99 port 80
// START: sudo pm2 start server.js - run only once

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
const lcd = require("./api/lcd")
const dev = require("./api/dev");
const PiCamera = require('pi-camera');

//CONTROLERS ------------------------------------------------------------
app.get("/", (req, res) => {
   res.sendFile("index.html");
});

app.get('/activate/:relayNum', (req, res) => {
   relay.activateRelay(req)
      .then((result) => { res.status(200).end(result.status) })
      .catch((reason) => { res.status(500).end(reason.msg) })
});

app.get('/status/:relayNum', (req, res) => {
   relay.checkStatus(req)
      .then((result) => { res.send(result.msg) })
      .catch(() => { res.status(500) })
})

app.get("/lcd/:msg", (req, res) => {
   lcd.print(req)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500))
});

app.get("/term/:cmd", (req, res) => {
   dev.terminal(req)
      .then(response => { console.log("SUCCESS: " + response); res.send(response); })
      .catch(reason => res.send(reason));
});

app.get("/getPic", (req, res)=>{
   // PiCamera module
   // INSTALL: npm install pi-camera
   const myCamera = new PiCamera({
      mode: 'photo',
      width: 640,
      height: 480,
      hflip: true,
      vflip: true,
      nopreview: true,
    });
   myCamera.snapDataUrl()
      .then((result) => {
         res.status(200).end(result);
      })
      .catch((error) => {
         res.status(500).end(error);
      })
});

//----------------------------------------------------------------------
// SERVER start
app.listen(80, () => {
   console.log("Server started on IP 192.168.0.99 port 80");
});