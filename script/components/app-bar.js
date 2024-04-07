class Nav extends HTMLElement{
   _shadowRoot= null ;
   _style = null ;

   constructor(){
    super();
    this._shadowRoot = this.attachShadow({mode:"open"});
    this._style = document.createElement("style");
   }

   _updateStyle(){
    this._style.textContent =`
    nav{
      display: flex;
      padding: 20px;
      flex-direction:row;
     }
     nav h1{
       margin-top: 30px;
       font-size:2.5em;
     }
    `;
   }

   _emptyContent(){
    this._shadowRoot.innerHTML ="";
    }
  connectedCallback( ){
        this.render();
   }

   render(){
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML +=`
      <nav>
				<img src="icons8-note-100.png">
				<h1>Notes App</h1>
			</nav>
    `;
   }
}

customElements.define("app-bar", Nav);
