class ArchiveNote extends HTMLElement{
  constructor(){
    super();
    this._shadowRoot = this.attachShadow({mode:"open"});
  }

  set eventArchivedNotes (event){
    this._eventArchivedNotes = event;
    this.render();
  }

  connectedCallback( ){
    this.render();
  }

  render(){
    this._shadowRoot.innerHTML =`
      <style>
        archive-notes{
          display: flex;
          padding: 20px;
          flex-direction:row;
        }
        .archive-notes h2{
          font-size:2em;
          text-align:center;
        }
        .archive-notes {
          margin-top:5px;
          padding:24px;
        }
      </style>
      <div class="archive-notes">
       <h2>Arsip Catatan</h2>
      </div>
    `;
  }
}

customElements.define("archive-note", ArchiveNote);
