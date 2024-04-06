class SearchNote extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style= document.createElement('style')
    this._searchNote=this._searchNote.bind(this)
  }
  _updateStyle(){
    this._style.textContent=`
        .search-container {
          display: flex;
          align-items: center;
          background-color: B3C8CF;
      margin-top:5px;
      padding:24px;
      }
      .search-container input {
          flex: 1;
          padding: 4px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-right: 4px;
          
          
      }
      .search-container button {
          padding: 8px 8px;
          border: none;
          border-radius: 4px;
          background-color:  F1EEDC;
          
          cursor: pointer;
      }
    `
  }
  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }
  _searchNote() {
    const noteTitle = this._shadowRoot.querySelectorAll(".title-note>h3");
    const searchInput = this._shadowRoot.getElementById('searchInput').value.toLowerCase()
    for (i = 0; i < noteTitle.length; i++) {
      if (!noteTitle[i].innerHTML.toLowerCase().includes(searchInput)) {
        noteTitle[i].parentElement.style.display = "none";
      } else {
        noteTitle[i].parentElement.style.display = "block";
      }
    }
    console.log(noteTitle)
  }
  
  render() {
    this._emptyContent()
    this._updateStyle()
    // this.connectedCallback()
    this._shadowRoot.appendChild(this._style)
    this._shadowRoot.innerHTML += `

    <div class="search-container">
        <input type="text" id="searchInput" placeholder="Ketik Untuk Mencari Notes">
        <button id="searchButton">Search</button>
    </div>
    
    
    `;
    this._shadowRoot.getElementById('searchButton').addEventListener("click", function (e) {
      e.preventDefault();
      _searchNote()
      this._shadowRoot.getElementById("searchInput").reset()
    });
  }
  
}

customElements.define("search-note", SearchNote);
