module.exports = {
    renderRaspiHome : function(req,res) {
        res.render('raspi_home')
    },
    isConnection : function(req,res){
        const socket = req.app.get("socketio");
        // this function expects a socket_io connection as argument
        
    },
    broadcastToRaspi : function (action){
        // const socket_io = req.app.get("socketio");
        // socket_io.emit("broadcast",action);
        // socket_io.on()


        // const socket_io = req.app.get("socketio");
        // if(req.body.filename){
        //     socket_io.emit('play', req.body.filename);
        //     return;
        // }
        // socket_io.emit('message', 'Hi from Server');
    }
}