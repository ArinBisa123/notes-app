import notesData from "../data/notes-data.js";

class NoteList extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this._searchNote=this._searchNote.bind(this)
  }

  _updateStyle() {
    this._style.textContent = `
    .container-note-list{
      margin-top: 70px;
      padding:8px 8px;
    }
    h2{
      font-size:2em;
      text-align:center;
    }
    .notes-list {
      margin-top: 100px;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-template-rows: auto;
      display: grid;
      justify-items: center;
      gap: 20px;
      margin:30px;
    }
      
    .notes-item {
      background-color:D6CCC2;
      box-shadow: 0 4px 9px 0 rgb(241, 238, 220);
      padding: 20px;
      font-size: 15px;
    }
    .title_note{
      font-size:18px;
    }
    .title_note,
    .body_note,
    .date_note {
      margin-bottom: 10px;
    }
    .body_note, .date_note{
      font-family:"Playfair Display", serif;
      font-weight:600;
    }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }
  _searchNote(searchInput) {
    const noteTitle = this._shadowRoot.querySelectorAll('.title_note')
    console.log(noteTitle)
    for (let i = 0; i < noteTitle.length; i++) {
      if (!noteTitle[i].firstElementChild.innerHTML.toLowerCase().includes(searchInput)) {
        noteTitle[i].parentElement.style.display = "none";
      } else {
        noteTitle[i].parentElement.style.display = "block";
      }
    }
    console.log(searchInput)
  }
  render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="container-note-list"> 
        <h2>Daftar Catatan</h2>   
        <div class="notes-list">
          ${notesData.map((note) => `
              <div class="notes-item">
                <div class="title_note">
                    <h3>${note.title}</h3>
                </div>
                <div class="date_note">
                ${new Date(note.createdAt).toLocaleDateString()}
                </div>
                <div class="body_note">
                    <p>${note.body}</p>
                </div>
              </div>
            `
          ).join("")}
        </div>
      </div>
    `;
  }
}
customElements.define("note-list", NoteList)
export default NoteList
