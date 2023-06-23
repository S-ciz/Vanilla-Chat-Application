

//client side socket io
const msgForm = document.querySelector('form.input')
const messageSection = document.querySelector('.messages')
const msgInput = msgForm.querySelector('input')

//chat variables
var sender = ""
var receiver = ""
var message =  ""  
var time = ""  


const socket = io()
//send message
msgForm.addEventListener('submit', e=>{
    e.preventDefault() 
    
    receiver = document.querySelector('span#receiver').textContent
    sender = document.querySelector('span#sender').textContent
    time = new Date().getHours() + ':' +  
            (new Date().getMinutes() < 10 ?  
            "0"+ new Date().getMinutes() :
             new Date().getMinutes())
    socket.emit("user_connected", sender)
    
    if(msgInput.value)
    {

    message = msgInput.value 
    socket.emit("send_message", {sender, receiver, message, time } )

    displayMsg(message,'', 30)
    saveMsgToApi(message)

     //clear fields
    msgInput.value = ''
    msgInput.focus();

    messageSection.scrollTop = messageSection.scrollHeight
    
    }
})

//send to receiver
socket.on("new_message", data=>{
    displayMsg(data.message, 'var(--blue-dark)', 5 )
})


//display message
function displayMsg(msg, color, left)
{   
   
    const messages = document.querySelector('div.messages')
    messages.innerHTML +=  
     `<div style="background:${color}; margin-left: ${left}rem"  class="text">

    <div class="msg"> ${msg}</div>
    <div class="time">
    <span></span>
    <small> ${time} <i class="fa fa-check-double"></i> </small>   
    </div> 

    </div>`
  
}


//save message to api/database
async function saveMsgToApi(msg)
{
    const UserId  = sessionStorage.getItem('user-id')
    const ChatId = sessionStorage.getItem('chat-id')

    const receiver = await getUser(ChatId)
    const sender = await getUser(UserId)

    const obj  = 
    {   
        cell: receiver.cell,
        receiver: receiver.cell,
        sender: sender.cell,
        message: msg,
        time: time
    } 

    const obj2 = 
    {   
        cell: sender.cell,
        sender: sender.cell,
        receiver: receiver.cell,
        message: msg,
        time: time
    }

    postMessage(UserId, obj)
    postMessage(ChatId, obj2)
      
}



//emoji
  new EmojiPicker({
    trigger: [
        {
            insertInto: ['#frm-input'],
            selector: '.toggle-emoji'
        }
    ],
    closeButton: true,
    dragButton: true
})