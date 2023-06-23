let inputTemp = document.createElement('template')

inputTemp.innerHTML = 
`
<form class="input">
   <i style="color:RGB(255,222,52)" class="fa fa-face-smile fa-lg"></i>
   <i style="color:var(--orange)" class="fa-solid fa-paperclip fa-lg"></i>
    <input active="true" type="text"  placeholder="Enter message..."/>
    <i class="fa-solid fa-microphone fa-lg"></i>
  </form>
`

class Input extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(inputTemp.content.cloneNode(true))
    }
}

window.customElements.define('my-input', Input)