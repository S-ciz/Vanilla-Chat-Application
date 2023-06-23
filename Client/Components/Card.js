let card_temp = document.createElement('template')

card_temp.innerHTML = 
`
<style>
.card
{
    background-color: #fff;
    padding: 1rem;
    margin-top: .5rem;
    line-height:.1rem;
}

.title
{
    font-weight: bold;
    color: var(--grey);
}


.card .content 
{
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    
}

.card .content p
{
    font-size: 1rem;
}
</style>

<div class='card'>
      <p class='title'> </p>

      <div class="content">
      <p class="name"></p>
      <p>  <slot name="icons"/>  </p> 
      </div>
    </div>
`

class Card extends HTMLElement 
{
    constructor()
    {
        super()
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(card_temp.content.cloneNode(true))
        this.shadowRoot.querySelector('p.title').textContent = this.getAttribute('title')
        this.shadowRoot.querySelector('p.name').textContent = this.getAttribute('name') 
    }
}

window.customElements.define('my-card', Card)