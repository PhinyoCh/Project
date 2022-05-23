const express = require("express");
const bodyParser = require("body-Parser");
const app = express();
const logger = require("morgan")
const config = require('./config/server.config');
const path = require('path');

//listening port
const server = app.listen(config.port, function() {
    console.log("Ready on port %d", server.address().port);
})

//Static File
app.use(express.static('public'));
app.use('/', express.static(__dirname));

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
var RoomDataRoutes = require("./routes/index.route");
var ProfileRoutes = require("./routes/profile.route");
var EditProfileRoutes = require("./routes/editprofile.route");
var RequestRoutes = require("./routes/request.route");
var UserManageRoutes = require("./routes/user_manage.route");
var UploadFile = require("./routes/sound_manage.route");

//use API
app.use("/",RoomDataRoutes);
app.use("/Login",LoginRoutes);
app.use("/usermanage",UserManageRoutes);
app.use("/upload",UploadFile);

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

