const app = require('express')()
const http = require('http').createServer(app)
const socketio = require('socket.io')(http)
const csvjson = require('csvjson');
const readFile = require('fs').readFile;
const fs = require('fs');
const allGroups = [];

app.get('/', (req, res) => {
    res.send("Server is running")
})

app.get('/getfile/', function(req, res) {
    console.log(JSON.stringify(req.query.group));
    var group = req.query.group;
  //  var response = readFile2(group);
    csvToJson(group,res);
    //res.send("Testing" + JSON.stringify(response))
})

app.get('/getlist/', function(req, res) {

    listallfiles(res);

    //res.send("Testing" + listallfiles())
})


app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

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


function readFile2(file){
csvToJson(file)
 var data = [{id:1,name:"Hugo"},{id:1,name:file}]
 return data;
}

function csvToJson(file,res){
    console.log(file);
    readFile('./f_schedules/'+file+'.csv', 'utf-8', (err, fileContent) => {
        if(err) {
            console.log(err); // Do something to handle the error or just throw it
            res.send(err)
            throw new Error(err);
        }
        const jsonObj = csvjson.toObject(fileContent);
        console.log(jsonObj);
        res.setHeader('Content-Type', 'application/json');
        res.send(jsonObj)
    });
}

function listallfiles(res){
    const testFolder = './f_schedules/';
    console.log("#####");
    const arr = [];
    fs.readdir(testFolder, function(err, files) {
      files.forEach(file => {
         arr.push(file);
        console.log(file);
      });
      res.send(JSON.stringify(arr));
    });
}


function printFiles(files){
   // allGroups = files;
    console.log(files[0]);
}