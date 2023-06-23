

 const baseUrl = 'http://localhost:5000/api/users'
 const msgUrl = 'http://localhost:5000/api/users/msg'

 //register user
  function registerUser(obj)
 {    
    const options = 
    {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(obj)
    }
       fetch(baseUrl, options)
       .then(res=>{
        console.log(res);
       })
 }


//get all users
 async function getUsers()
{
   const res = await fetch(baseUrl)
   const data = await res.json()
   return data
} 

//get single user
async function getUser(id)
{
    const newUrl = baseUrl + '/' + parseInt(id) 
    const res = await fetch(newUrl)
    const data = await res.json()
    return data
}

//get chats for current user
 async function fetchChats(id)
{   
   
    id = parseInt(id)
    //get user object
    const user = await getUser(id)
    //get all users as data
    const data = await getUsers()
    //access the cell
    const cells = user.chats_cell

    var myChats = []
     
    data.forEach(element=>{

       for(let c = 0; c< cells.length; c++)
       {
        if(element.cell === cells[c][0])
        {    //apend to
            myChats = [ ...myChats, element ]
        }
       }
    })

    
   
    
    return myChats

    //end of fetch chats
}  

//add chat to array of chat_cells 


//assume chat does not exists


function addChat(number, id)
{   
      
    //create user
    const newurl = baseUrl + '/' + id
    const obj = { chat: number }
    const options = 
    {
        method: "PUT",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(obj)

    }
    fetch(newurl, options)
    .catch(err=>{
        console.log(err);

        //end of fetch
    }) 
    
//end of add chat   

} 


//Post message
 function postMessage(id, obj)
{
    //create user
    const newurl = msgUrl + '/' + id
    
    const options = 
    {
        method: "PUT",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(obj)

    }
    fetch(newurl, options)
    .catch(err=>{
        console.log(err);

        //end of fetch
    }) 

    
}