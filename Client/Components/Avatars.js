
const AvatarTemp = document.createElement('template')

AvatarTemp.innerHTML = 
`
<style> 

.images
{
    display: flex;
    gap: 1rem;
    place-items: center;
    place-content: center;
    margin: 1rem 0;
}
.images .img 
{
    width: 50px;
    height: 50px;
    background: #ccc;
    border-radius: 50%;

}
.images .img:hover
{
cursor: pointer;
}

.images .img img 
{
    
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}

.selected-avatar
{
    display: grid;
    border: 3px solid var(--green);
    place-items: center;
    place-content: center;
    margin: auto;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #ccc;
}

.wrapper
{
   
    padding:1rem;

}

.selected-avatar img
{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
}

</style>

          <div class="wrapper"> 
          <div class="selected-avatar">

            <img id="my-img" src="./img/encanto.jpg" alt="">
          </div>
          <div class="images">
            <div class="img">
              <img src="./Img/doll.jpg" alt="img">
            </div>
            <div class="img">
              <img src="./Img/encanto.jpg" alt="img">
            </div>
            <div class="img">
              <img src="./Img/ice.png" alt="img">
            </div>
            <div class="img">
              <img src="./Img/shrek.jpeg" alt="img">
            </div>
            <div class="img">
              <img src="./Img/Tangled.jpg" alt="img">
            </div>

          </div>
      
          <!--end of wrapper-->
          </div>

`

class Avatar extends HTMLElement 
{
    constructor() 
    {
        super()
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(AvatarTemp.content.cloneNode(true))
    }  

    toggleAvatar(e)
    {
        if(e.target.alt==='img') 
     { 
      
  
      const selectedAvatar = this.parentElement.previousElementSibling
       selectedAvatar.innerHTML = ''
       selectedAvatar.innerHTML = `<img src=${e.target.src} />`
       sessionStorage.setItem('avatar', e.target.src)
     }
    }


    connectedCallback()
    {
        this.shadowRoot.querySelectorAll('div.img')
        .forEach(element=>{
           element.addEventListener('click', this.toggleAvatar)
       })
    }


    disconectedCallback()
    {
        this.shadowRoot.querySelectorAll('div.img')
        .forEach(element=>{
           element.removeEventListener('click', this.toggleAvatar)
       })
    }


    

} 







window.customElements.define('my-avatar', Avatar)