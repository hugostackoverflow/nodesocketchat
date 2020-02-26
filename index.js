const app = require('express')()
const http = require('http').createServer(app)
const socketio = require('socket.io')(http)
const csvjson = require('csvjson');
const readFile = require('fs').readFile;
const fs = require('fs');
var path = require('path');

const allGroups = [];


app.get('/', (req, res) => {
  
    res.sendFile(path.join(__dirname + '/index.html'));
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

app.get('/writelist/', function(req, res) {

    writeJson(res);

    //res.send("Testing" + listallfiles())
})


app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});


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
    res.setHeader('Content-Type', 'application/json');
    var data = {
        'Subject': 'ERROR',
        'Start Date': '30.09.2019',
        'Start Time': '11:10',
        'End Date': '30.09.2019',
        'End Time': '12:00',
        'Description': 'BBA 3 - K1',
        'Location': '',
        '': ''
      };
    console.log(file);

    if(typeof file === "undefined" || file === null){
        res.send(JSON.stringify("Wrong Values"));
    }else{
        try{
            readFile('./f_schedules/'+file+'.csv', 'utf-8', (err, fileContent) => {
                if(err) {
                    //console.log(err); // Do something to handle the error or just throw it
                    res.send(JSON.stringify(data))
                // throw new Error(err);
                }
                const jsonObj = csvjson.toObject(fileContent);
                console.log(jsonObj);
                
                res.send(jsonObj)
            });
            }
            catch{
                res.send(JSON.stringify(data)) 
            }
    }
        
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
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(arr));
    });
}


function writeJson(res){
   // console.log(res);
    fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log("ERROR: "+err);
        } else {
            console.log(data);
        obj = JSON.parse(data); //now it an object
        obj.push({id: 2, square:3}); //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('myjsonfile.json', json, 'utf8', function(){
            console.log("done");
            res.setHeader('Content-Type', 'application/json');
            res.send(json);
        }); // write it back 
    }});
}
function hello(){
    console.log("finish");
}
function printFiles(files){
   // allGroups = files;
    console.log(files[0]);
}