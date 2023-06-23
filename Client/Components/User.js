const user_template =  document.createElement('template')

user_template.innerHTML = 
`
<style> 
div.user 
{  
    display: flex;
    place-items: center;
    justify-content: space-between;
    padding: .5rem;
    width: 100%;
    background-color: var(--blue-dark);
    color:var(--white); 
    line-height: .3rem;
} 

.user .first-content
{
    display:flex;
    gap:1rem;
    place-item:center;
    place-content:center;
}


.user .img
{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: center;
}

.user .img:hover
{
    cursor: pointer;
}

.user .img img
{  
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: center;
}

.icons
{
    display:flex;
    color:var(--white);
    padding-right:1rem;
}





</style>

<div class='user'>
    <div class="first-content">
        <div class="img"> 
        <img  src=""  alt="img"/>
         </div>
      <div class="name">
         <h3 class="title"><slot name="title"/> </h3> 
         <small> <slot name="status"/> </small>
      </div>
      </div>

      <div class="icons">
     
      <p> <slot name="icon"/> </p>
    
      </div>
</div>

`

class MyUser extends HTMLElement
{
  constructor()
  {
    super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(user_template.content.cloneNode(true))
     this.shadowRoot.querySelector('img').src =  this.getAttribute('imgsrc')
  }
    
  //add user 
  
  //toggle user
  toggleUser()
  {  
      document.querySelector('.comp-1').innerHTML = 
         `
         <div>
            <my-profile>
            <div slot="arrow"> 
           <a style="color:var(--white)" href="index.html" <i class="fa fa-arrow-left"></i> </a>
            </div/
            </my-profile>
         </div>

         `

  }
  //User functionnalities
  connectedCallback()
  {
        this.shadowRoot.querySelector('div.img') 
        .addEventListener('click', this.toggleUser)
  }

  disconnectedCallback()
  {
    this.shadowRoot.querySelector('div.img') 
    .removeEventListener('click', this.toggleUser)
  }

}

window.customElements.define('my-user', MyUser)