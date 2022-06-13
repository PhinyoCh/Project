module.exports = {
    renderRaspiHome : function(req,res) {
        res.render('raspi_home')
    },
    isConnection : function(req,res){
        const socket = req.app.get("socket");
        // this function expects a socket_io connection as argument
        
    },

    stopAudio : function (req, res){
        const io = req.app.get("io");
        //console.log(io);
        io.emit("broadcastToStop", "Stop");
        // socket_io.on()


        // const socket_io = req.app.get("socketio");
        // if(req.body.filename){
        //     socket_io.emit('play', req.body.filename);
        //     return;
        // }
        // socket_io.emit('message', 'Hi from Server');
    },

    playAudioFile : function (req, res){
        console.log(req.body);
        const io = req.app.get("io");
        //console.log(io);
        io.emit("broadcast", req.body);
        // socket_io.on()


        // const socket_io = req.app.get("socketio");
        // if(req.body.filename){
        //     socket_io.emit('play', req.body.filename);
        //     return;
        // }
        // socket_io.emit('message', 'Hi from Server');
    }
}