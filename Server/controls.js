
var _data = require('./data')

class User 
{  
    //get users
    static async getUsers()
    {
        return new Promise((resolve, rej)=>{
            resolve(_data)
        })
    }

    //get user
    static async getUser(id)
    {
        return new Promise((resolve, reject)=>{
            const objUser = _data.find((use)=> use.id === parseInt(id))

            if(objUser)
            {
                resolve( objUser )
            }
            else{
                reject(`no user with id of ${id} found!!`)
            }
        })
    }

    //create/add user : POST
   static async addUser(obj)
    {
          return new Promise((resolve, reject)=>{

            const newobj = 
            {
                id: _data.length + 1,
                ...obj
            }

            _data = [..._data, newobj]

            resolve(_data)
          })
    } 
     
    //send message 
    static async sendMsg(id, cell, obj)
    {
        return new Promise((resolve, reject)=>{
       
            const user = _data.find(use=> use.id === parseInt(id)) 
            if(user)
            {
                const arr = user.chats_cell;
                arr.find(item=>{
                   if(item[0] === cell)
                   {
                     item.push(obj) 
                      resolve(item)
                   }
                })
            }
            else
            {
               reject(`cannot find user with id ${id}`)
            }
            
            
        })
    }


    //updateUser
    static async updateUser(id, newCells)
    {
        return new Promise((resolve, reject)=>{
            const user = _data.find(use=> use.id === parseInt(id)) 
              
            if(user)
            {
               user.chats_cell.push([newCells])
               resolve(user)
            }
            else
            {
                reject(`user with id ${id} does not exist`)
            }
        })
    }
    
    //remove user

    static async removeUser(id)
    {
        return new Promise((resolve, reject)=>{
            const user = _data.find(use=> use.id === parseInt(id))

            if(user)
            {
                _data = _data.filter(use=> use.id !==  parseInt(id) )
                resolve(_data)
            }
            else 
            {
                reject( `couldn't delete user with the id of ${id}`)
            }
        })
    }
}


module.exports = User