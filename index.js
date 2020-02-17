const app = require('express')()
const http = require('http').createServer(app)
const socketio = require('socket.io')(http)

app.get('/', (req, res) => {
    res.send("Server is running")
})

app.get('/test', (req, res) => {
    res.send("Testing")
})

socketio.on("connection", (userSocket) => {
    userSocket.on("send_message", (data) => {
        console.log("Send Message " )
        userSocket.broadcast.emit("receive_message", data)
    })

    userSocket.on("typing", (data) => {
        console.log("Typing" )
        userSocket.broadcast.emit("typing", data)
    })

    userSocket.on("stop_typing", (data) => {
        console.log("Stop" )
        userSocket.broadcast.emit("stop_typing", data)
    })
})

//http.listen(process.env.PORT)
app.set('port', process.env.PORT || 3000);
http.listen(app.get('port'),
  function(){
    console.log("Express server listening on port " + app.get('port'));
});
