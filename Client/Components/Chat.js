
var chat_template =  document.createElement('template')
chat_template.innerHTML = 
`
<style> 
.chat
{
    width: 100%;
    display: flex;
    justify-content: space-between;
    place-items: center;
    padding: 1rem;
}

.chat small 
{
    color: var(--grey);
}

.chat img
{
    width: 100%;
}

.chat .addition
{   
    display: inline;
    text-align: center;
    place-items: center;
    place-content: center;
    padding-right:1.5rem;
}
 .addition small.time 
{
 margin-bottom: 10rem;
}


.chat .img 
{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    place-content: center;
    background: var(--grey-light);
    object-fit: cover;
}

.chat:hover
{
    cursor:pointer;
    background-color: var(--white);
}

.chat .img img
{
    width: 50px;
    height:50px;
    border-radius: 50%;
    display: grid;
    place-items: center;
}
.chat .content p
{
    color: var(--grey);
}

.chat .content p.title
{
   color: var(--black) ;
   font-weight: bold;
}
.content 
{
    width: 80%;
    line-height: .2rem;
}
.first-content
{
    display: flex;
    place-items: center;
    gap: 1rem;
}


</style>

<div class='chat'>  
<div class='first-content'>
<div class='img'>
  <img src="" alt="img"/>
</div>
<div class='content'>
    <p class='title'></p >
    <small> hello bro how you do... </small>
</div>
</div>
<div class='addition'>
    <small class='time'>11:30 </small>
 <!--   <Badge number={1}/> -->
</div>
</div>

`

class Chat extends HTMLElement
{
    constructor()
    {
        super()
        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(chat_template.content.cloneNode(true))
        this.shadowRoot.querySelector('img').src = this.getAttribute('img')
        this.shadowRoot.querySelector('p.title').textContent = this.getAttribute('name')
        this.shadowRoot.querySelector('div.chat').id = this.getAttribute('id')
        
    }

    //events

    async toggleChat()
    {   
        //set current user
        const id = this.querySelector('div.chat').id 
        sessionStorage.setItem('chat-id', id)
         
        //get user
        const user = await getUser(id)
        setCurrentChat(user.name, user.active, user.img)

        //paste to secret
        document.querySelector('span#receiver').textContent = this.querySelector('p.title').textContent
    
        //display conversations
        displayMessages() 
        
    
    }
    connectedCallback()
    {
        this.shadowRoot.addEventListener('click', this.toggleChat)
    }

    disconnectedCallback()
    {
        this.shadowRoot.removeEventListener('click', this.toggleChat) 
    }
}

window.customElements.define('my-chat', Chat)



function setCurrentChat(name, status, img)
{
    const  data = 
    ` <div> 
    <my-user imgsrc=${img} >
        <div slot="title">${name}</div>
        <div slot="status">${status}</div>

        <div style="display: flex; gap: 2rem; padding-right: 1.5rem;" slot="icon"> 
            <i class="fa fa-phone "></i>
            <i class="fa fa-video "></i>
            <i class="fa fa-message "></i>
            
        </div>  

    </my-user>
  </div>`

  document.querySelector('.user-part').innerHTML = data
}




function displayMsgHelper(msg,tyd, color, left)
{   
    const messages = document.querySelector('div.messages')
    messages.innerHTML +=  
     ` <div style="background:${color}; margin-left: ${left}rem"  class="text"> 
    <div class="msg">  ${msg}</div>
    <div class="time">
    <span></span>
      <small> ${tyd} <i class="fa fa-check-double"></i> </small>   
    </div> 
   </div>` 
   //set to current height
   messages.scrollTop = messages.scrollHeight
}



async function displayMessages()
{
     const UserId = sessionStorage.getItem('user-id')
     const ChatId = sessionStorage.getItem('chat-id')
     document.querySelector('div.messages').innerHTML = ''

     const User = await getUser(UserId) 
     const Chat = await getUser(ChatId)

    var conversation = User.chats_cell.filter(use=> use[0] === Chat.cell)
         

    
         for(let c = 0; c< conversation.length; c++)
         {
            
            for(let a = 1; a < conversation[c].length; a++)
            {
                const obj = (conversation[c][a]);

                
                if(obj.sender !== User.cell && conversation[c].length >1 )
                {
                    displayMsgHelper(obj.message, obj.time, "var(--blue-dark)", 5)
                } 
                else
                { 
                    displayMsgHelper(obj.message, obj.time, "var(--green)", 30)
                }
               
            }
         }
         
           
        

        
        
    


     
}

