import NoteList from "./note-list.js";

class SearchNote extends HTMLElement {
  // _submitEvent='submit'
  // _searchEvent='search'
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style= document.createElement('style')
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
    // this._shadowRoot.querySelector('form').addEventListener('submit',(event) => this._onFormSubmit(event,this))
    // this.addEventListener(this._submitEvent,this._onSearchBarSubmit)
    this.render();
  }

  // _onFormSubmit(event, searchBarInstance) {
  //   searchBarInstance.dispatchEvent(new CustomEvent('submit'));
 
  //   event.preventDefault();
  // }

  // _onSearchBarSubmit() {
  //   const query = this._shadowRoot.querySelector('input#searchInput').value;
 
  //   if (!query) return;
 
  //   this.dispatchEvent(
  //     new CustomEvent(this._searchEvent, {
  //       detail: { query },
  //       bubbles: true,
  //     }),
  //   );
  // }
  render() {
    this._emptyContent()
    this._updateStyle()

    this._shadowRoot.appendChild(this._style)
    this._shadowRoot.innerHTML += `

    <div class="search-container">
      <h2>Cari Notes</h2>
      <form id="searhField" class="search-field">
        <input type="text" id="searchInput" placeholder="Ketik Judul Note">
        <button id="searchButton">Cari</button>
      </form>
    </div>
    
    
    `;
    const searchForm = this._shadowRoot.querySelector(".search-field")
    const searchInput = this._shadowRoot.getElementById('searchInput').value
    this._shadowRoot.getElementById('searchButton').addEventListener('click', function (e){
      e.preventDefault();
      searchNote(searchInput)
      searchForm.reset()
      console.log(searchInput)
    }) 
    const noteList =new NoteList()
    const searchNote = noteList._searchNote
  }
  
}

customElements.define("search-note", SearchNote);
