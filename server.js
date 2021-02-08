// Irrigation server running on 192.168.0.99 port 80
// START: sudo pm2 start server.js - run only once

const express = require('express');
const app = express();
const server = require('http').createServer(app);

// Module for cameraView
const PiCamera = require('pi-camera');



// Middleware
app.use(express.static('public'));
app.use(express.static('api'));

// Driver file import
const relay = require("./api/relay")
const lcd = require("./api/lcd")
const dev = require("./api/dev");


// WEB SOCKETS ----------------------------- TODO
const WebSockets = require('ws');

//CONTROLERS ------------------------------------------------------------
app.get("/", (req, res) => {
   res.sendFile("index.html");
});

app.get('/activate/:relayNum', (req, res) => {
   relay.activateRelay(req)
      .then((result) => {
         res.status(200).end(result.status)
      })
      .catch((reason) => {
         res.status(500).end(reason.msg)
      })
});

app.get('/status/:relayNum', (req, res) => {
   relay.checkStatus(req)
      .then((result) => {
         res.send(result.msg)
      })
      .catch(() => {
         res.status(500)
      })
})

app.get("/lcd/text/:msg", (req, res) => {
   lcd.print(req)
      .then(() => res.status(200).end("good"))
      .catch((er) => res.status(500).end(er));
});

app.get("/lcd/weather/", (request, response) => {
   lcd.weather(request)
      .then((result) => response.status(200).end(result))
      .catch((reason) => response.status(500).end(reason));
});

app.get("/term/:cmd", (req, res) => {
   dev.terminal(req)
      .then(response => {
         console.log("SUCCESS: " + response);
         res.send(response);
      })
      .catch(reason => res.send(reason));
});

app.get("/getPic", (req, res) => {
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
server.listen(80, () => {
   console.log("Server started on IP 192.168.0.99 port 80");
});