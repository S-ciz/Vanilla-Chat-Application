const express = require('express')
const app = express()
const http = require('http')
const bodyParser = require('body-parser')
const server = http.createServer(app)
const Cors = require('cors')
const PORT = 5000 || process.env.PORT
const controls = require('./controls')



// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//use cors
app.use(Cors());

//get all users
app.get('/api/users', async(req, res)=>{
    res.writeHead(200, {"Content-Type": "application/json"} )
    const response = await controls.getUsers()
    res.end(JSON.stringify(response) )
})

//get single user  
app.get('/api/users/:id', async(req, res)=>{
    
    try
    {   
        res.writeHead(200, {"Content-Type": "application/json"})
        var id = req.url.split("/")[3] 
        const user = await controls.getUser(id)
        res.end(JSON.stringify(user))
    } 
    catch(err){res.end(JSON.stringify({Message: err}))}
})


//add user/ post user
app.post('/api/users', async(req, res)=>{
        //res.writeHead(200, {"Content-Type": "application/json"})
        const newUser = await controls.addUser(req.body)
        res.json(newUser) 
}) 


//update chatcells
app.put('/api/users/:id/', async(req, res)=>{
     try
     {
    const id = req.url.split('/')[3];
    const user = await controls.updateUser(id, req.body.chat)
    res.end(JSON.stringify(user)) 
     }
   catch(err){ res.end(JSON.stringify({message: err}))}

})

//update chat cell conversations
app.put('/api/users/msg/:id', async(req, res)=>{
     
    try
     {
    const id = req.url.split('/')[4];
    const user = await controls.sendMsg(id, req.body.cell, req.body)
    res.end(JSON.stringify(user)) 
     }
   catch(err){ res.end(JSON.stringify({message: err}))}
})

//delete user
app.delete('/api/users/:id', async(req, res)=>{
    try{
        const id = req.url.split("/")[3]
        const newUsers = await controls.removeUser(id)
        res.send(JSON.stringify(newUsers))
      }
    catch(err){res.send(JSON.stringify({Message: err}))} 
})
 
const path = require('path')
app.use(express.static(path.join(__dirname, '../Client')))
const socketio= require('socket.io')
const io = socketio(server)

var users = [];

io.on("connection", socket=>{
   
    //user connected
    socket.on("user_connected", username=>{
        //add users to list
        users[username] = socket.id
       io.emit("user_connected", username)
    })  

    //listen for message
    socket.on("send_message", (data)=>{
        //send message to receiver
        var socketID = users[data.receiver]
        io.to(socketID).emit("new_message",data )
    })
})


//listen to server
server.listen(PORT, ()=>{
    console.log(`server running at port ${PORT}`);
})