const noti_template = document.createElement('template')

noti_template.innerHTML = 
`
<style> 

.badge
{
    width: 5px;
    height: 5px;
    text-align: center;
    background:red;
    border-radius: 50%;
    padding: .7rem;
    display: grid;
    place-items: center;
    place-content: center;
    color: white;
    font-size: 12px;
    margin-top: -.3rem;
}
</style/>

<div class='badge'>
      <slot name='number' />
</div>
`

class Badge extends HTMLElement 
{
    constructor()
    {
        super()
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(noti_template.content.cloneNode(true))
    }
}


window.customElements.define('my-badge', Badge)