//Navba component

const template = document.createElement('template')
template.innerHTML = 
` <style> 
header
{  
    width: 100%;
    background-color:var(--blue-dark);
    box-shadow: var(--shadow);
    display: flex;
    justify-content: space-between;
    color: white;
    border-bottom: 1px solid var(--white);
}

header p.content 
{
    padding-right:2rem
}
  </style> 
   

    <header>
      <p> <slot name='log'/> </p>
      <p class="content">Whatsapp</p>
    </header>
`
class myBar extends HTMLElement 
{
    constructor()
    {
        super();
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.querySelector('p.content').textContent = this.getAttribute('title')
    }
}

window.customElements.define('my-bar', myBar)