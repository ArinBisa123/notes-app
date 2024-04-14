class Navbar extends HTMLElement{
  constructor(){
    super();
    this._shadowRoot = this.attachShadow({mode:"open"});
  }

  // set eventArchivedNotes (event){
  //   this._eventArchivedNotes = event;
  //   this.render();
  // }

  connectedCallback( ){
    this.render();
  }

  render(){
    this._shadowRoot.innerHTML =`
      <style>
        nav{
          display: flex;
          padding: 20px;
          flex-direction:row;
        }
        nav h1{
          margin-top: 30px;
          font-size:2.5em;
        }
      </style>
      <nav>
				<img src="icons8-note-100.png">
				<h1>Notes App</h1>
			</nav>
    `;

    // this._shadowRoot.querySelector('h1').addEventListener('click', this._eventArchivedNotes);
  }
}

customElements.define("app-bar", Navbar);
