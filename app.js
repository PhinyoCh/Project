const express = require("express");
const bodyParser = require("body-Parser");
const app = express();
const logger = require("morgan")
const config = require('./config/server.config');
const path = require('path');
const cookieParser = require('cookie-parser');
const socketController = require('./controllers/socket.controller');
const roomController = require('./controllers/room.controller');
const logController = require('./controllers/log.controller');
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
var socketRoute = require("./routes/socket.route");
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
app.use("/socket",socketRoute);
app.use("/testplaysound",testPlaySoundRoutes);

//Socket
const io = require("socket.io")(server, { cors: { origin: "*" } });

// next line is the money

io.on("connection", (socket) => {
  let sid = socket.id;
  app.set('socket', socket);
  app.set('io', io);
  socket.on("device_info", function(res){
    console.log({'Client Connected...' : {"socket_id":socket.id,"MAC_ADDRESS":res.MAC_ADDRESS}});
    res.SOCKET_ID = sid;
    roomController.addRoom(res);
    roomController.setStatus(1, sid);
    io.emit('update', 'refresh');
    logController.saveConnectionLog(res.MAC_ADDRESS, 11, res.TIMESTAMP, 'Connection Successes');
  });

  // console.log(socket.handshake);
  // var address = socket.handshake.address;
  // console.log('New connection from ' + address.address + ':' + address.port);

  socket.on("disconnect", (response) => {

    roomController.setStatus(2, sid);
      var TIMESTAMP = new Date().toISOString();
      console.log({'Client Disconnect...' : {"Socket_id":socket.id}});
      io.emit('update', 'refresh');
      logController.saveConnectionLog(socket.id, 10, TIMESTAMP, 'Disconnect By Node');
  })
});

