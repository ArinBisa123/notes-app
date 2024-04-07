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
        margin-top:5px;
        padding:24px;
      }
      .search-container h2{
        text-align:center;
        font-size:2em;
      }
      .search-field{
        display:flex;
        justify-content:center;
      }
      .search-field input {
        width: 700px;
        padding: 8px 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-right: 4px;
        font-family:"Playfair Display", serif;
        font-size:16px;
      }
      .search-field input:hover{
        font-weight:bold
      }
      .search-field button {
        background-color:D5BDAF;
        width: 50px;
        padding: 8px 8px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-family: "Playfair Display", serif;
        font-size:16px;
      }
      .search-field button:hover{
        font-weight:bold;
        background-color: F5EBE0;
        border: solid;
        border-color: D5BDAF
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
    const searchInput = this._shadowRoot.getElementById('searchInput').value.toLowerCase()
    for (i = 0; i < noteTitle.length; i++) {
      if (!noteTitle[i].innerHTML.toLowerCase().includes(searchInput)) {
        titleElement.parentElement.style.display = "none";
      } else {
        noteTitle[i].parentElement.style.display = "block";
      }
    }
    console.log(noteTitle)
  }
    
  render() {
    this._emptyContent()
    this._updateStyle()

    this._shadowRoot.appendChild(this._style)
    this._shadowRoot.innerHTML += `

    <div class="search-container">
      <h2>Cari Notes</h2>
      <form class="search-field">
        <input type="text" id="searchInput" placeholder="Ketik Judul Note">
        <button type="submit" id="searchButton">Cari</button>
      </form>
    </div>
    
    
    `;
    const searchNote = this._searchNote
    const searchForm = this._shadowRoot.querySelector(".search-field")
    this._shadowRoot.getElementById('searchButton').addEventListener("submit", function (e) {
      e.preventDefault();
      searchNote()
      searchForm.reset()
    });
  }
  
}

customElements.define("search-note", SearchNote);
