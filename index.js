const express = require('express'); 
const shortid = require('shortid')
const cors = require('cors')
const server = express(); // creates the server


server.use(express.json()) // converts requests to json.
server.use(cors())
const users= [
    {
        id: 1, // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
      }
]



// Post a new user to the server db.
server.post("/api/users", (req,res) =>{
    const user = {
        id: shortid.generate(),
        ...req.body
    }
    // if no name is supplied send error
    if (!user.name || !user.bio){
        res.status(400).json({errorMessage:"please provide name and bio"})
    }
    else if (user.name && user.bio){
        users.push(user)
        res.status(201).json(user)
    }
    else {
        res.status(500).json({errorMessage:"There was an error while saving the user to the database"})
    }
})

server.get("/api/users", (req,res)=>{
    if(users){
        res.status(200).json(users)
    }
    else {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
})

server.get("/api/users/:id",(req,res)=>{
    const id = req.params.id;
    const user = users.find((user) => user.id == id);

    if (user) {
        res.status(200).json(user)
    }
    else {
        res.status(404).json({errorMessage: '404 Specified User ID Not Found'})
    }
})

server.delete("/api/users/:id",(req,res)=>{
    const id = req.params.id;
    const user = users.find((user)=> user.id == id);

    if (user){
        users =users.filter(user=>user.id != id);
        res.status(200).json(users)
    }
    else if (!user){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    else {
        res.status(500).json({ errorMessage: "The user could not be removed" })
    }
})

server.put("/api/users/:id", (req,res)=>{
    const id = req.params.id;
    const user = users.find(userToFind=>userToFind.id == id)

    if(req.body.name && req.body.bio) {
        if (user) {
          try {
            user.name = req.body.name
            user.bio = req.body.bio
            res.status(200).json({message: 'PUT successful!'})
          } catch (error) {
            res.status(500).json({errorMessage: "User Info Could not be modified"})
          }
        } else {
          res.status(404).json({errorMessage: "User does not exist"})
        }
      } else {
        res.status(400).json({errorMessage: "Provide name and bio for user"})
    }
})

// watch for connections on port 4000
server.listen(4000, () =>
  console.log('Server running on http://localhost:4000')
);