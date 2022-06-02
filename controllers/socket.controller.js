module.exports = {
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
        socket_io.emit('hello', 'hi from server');
    }
}