module.exports = {
    renderRaspiHome : function(req,res) {
        res.render('raspi_home')
    },
    isConnection : function(req,res){
        const socket_io = req.app.get("socketio");
        // this function expects a socket_io connection as argument
        socket_io.on("data", function(resp){
            var IP = JSON.stringify(resp.ip_address)
            console.log(IP);
        });
        socket_io.on("disconnect", (response) => {
            console.log('Client Disconnectd...');
        })
    },
    broadcastToRaspi : function (req,res,next){
        const socket_io = req.app.get("socketio");
        if(req.query.filename){
            socket_io.emit('play', req.query.filename);
            return;
        }
        socket_io.emit('message', 'Hi from Server');
    }
}