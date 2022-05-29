const express = require("express");
const bodyParser = require("body-Parser");
const app = express();
const logger = require("morgan")
const config = require('./config/server.config');
const path = require('path');
const cookieParser = require('cookie-parser');
//import { useState, useEffect } from 'react';

//listening port
const server = app.listen(config.port, function() {
    console.log("Ready on port %d", server.address().port);
})

//Static File
app.use(express.static('public'));
app.use('/', express.static(__dirname));
app.use(cookieParser())

//Set Views engine
app.set('views',[
    path.join(__dirname,'views')
]);
app.set('view engine' , 'ejs');

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
        bodyParser.urlencoded({
            extended: false
        })
)

//require API
var LoginRoutes = require("./routes/login.route");
var LogoutRouter = require("./routes/logout.route");
var RoomDataRoutes = require("./routes/index.route");
var ProfileRoutes = require("./routes/profile.route");
var RequestRoutes = require("./routes/request.route");
var UserManageRoutes = require("./routes/user_manage.route");
var UploadFileRoutes = require("./routes/sound_manage.route");
var ReportRoutes = require("./routes/report.route");
var testPlaySoundRoutes = require("./routes/test_play_sound.route");


//use API
app.use("/",RoomDataRoutes);
app.use("/Login",LoginRoutes);
app.use("/Logout", LogoutRouter);
app.use("/usermanage",UserManageRoutes);
app.use("/upload",UploadFileRoutes);
app.use("/request",RequestRoutes);
app.use("/report",ReportRoutes);
app.use("/profile",ProfileRoutes);
app.use("/testplaysound",testPlaySoundRoutes);

//Socket
const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", (client) => {
  client.on("data", function(resp,){
    let IP = JSON.stringify(resp.ip_address)
    console.log(IP);
  });
  

  client.on("disconnect", (response) => {
    console.log('Client Disconnectd...');
  })
});

