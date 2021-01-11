const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.static('api'));
app.use(express.static('c'));

app.get("/", (req, res) => {
   res.sendFile("index.html");
});

app.listen(80, () => {
   console.log("Server started on IP 192.168.0.99 port 80");
});

app.get('/activate/:relayNum', (req, res) => {
   const relay = require('./api/relay');
   relay.activateRelay(req)
      .then((result) => { res.send(result.msg) })
      .catch((reason) => { res.status(500).end("No good " +  reason.msg) })
});
