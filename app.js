const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware
app.use(express.static('public'));
//require('dotenc').config();
//

app.get("/", (req, res) => {
   res.sendFile("index.html");
});

app.listen(80, () => {
   console.log("Server started on IP 192.168.0.99 port 80");
});
