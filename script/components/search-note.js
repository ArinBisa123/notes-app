
class SearchNote extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  set eventSearch(event){
    this._eventSearch = event;
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
      <style>
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
      </style>
      <div class="search-container">
        <h2>Cari Notes</h2>
        <form id="searchField" class="search-field">
          <input type="text" id="searchInput" placeholder="Ketik Judul Note">
          <button type="button" id="searchButton">Cari</button>
        </form>
      </div>
    `;
    this._shadowRoot.querySelector("#searchButton").addEventListener('click', () => {
      this._eventSearch(this._shadowRoot.querySelector('#searchInput').value);
    });
  }
}

customElements.define("search-note", SearchNote);
