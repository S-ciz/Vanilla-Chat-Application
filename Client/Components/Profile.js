let profTemp = document.createElement('template')



getUser(sessionStorage.getItem('user-id'))
.then(user=>{


    profTemp.innerHTML = 
` 
<style>
.profile .header
{
  padding: 1.4rem;
  background-color: var(--blue-dark);
  color: var(--white);
  display: flex;
  gap: 2rem;
}

.profile
{
    background-color: var(--white);
}

.profile .profile-img
{
    display: grid;
    place-items: center;
    background-color: var(--grey-light);
    margin: auto;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-top: 1rem;
}

.profile .profile-img img
{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
}
.profile .profile-img img:hover
{
    cursor: pointer;
}
</style>


<div class='profile'>
<div class="header">
 
<h2> <slot name="arrow"/> </h2>
<h2>Profile</h2>

</div>

<div class="profile-img">
  <img onClick="editDP()" src="${user.img}" alt="img" />
</div>

<div class="additions"><div>  
<div> <my-card title="Username"  name="${user.name}"/>  </div>
<div> <my-card title="Cell" name="${user.cell}"/>  </div>
<div> <my-card title="Status"  name="${user.status}"/>  </div>

</div>


</div>`

})

var activeAvatar = true;
class Profile extends HTMLElement 
{
    constructor()
    {
        super()
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(profTemp.content.cloneNode(true))
    }
}

function editDP()
{    
    
   
   const div =  document.createElement('div')
   const components = document.querySelector('div.main') 

    div.style.background = 'var(--blue-dark)'
    div.style.padding = '0 1rem'
    div.style.border = '1px solid #ccc;'


    if(activeAvatar)
    {
        div.innerHTML = ''
        div.innerHTML += 
         `  
         <div style="color:#fff;  padding: 1rem 0">  Return  </div>
         <div > <my-avatar/>  </div>
         <div style="display:grid; width:100%;"> 
        <button style="border:1px solid #ccc; display: grid; " class="btn-submit" >
         Update profile
         </button>
        </div>

        `
        components.appendChild(div)
        activeAvatar = false;
    }
   


  

    
}

window.customElements.define('my-profile', Profile)