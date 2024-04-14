class NoteList extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  set notes(notes){
    this._notes = notes;
    this.render();
  }

  set eventDeleteNote(event){
    this._eventDeleteNote = event;
  }
  set eventArchivedNote(event){
    this._eventArchivedNote=event
    this.render()
  }

  render() {
    this._shadowRoot.innerHTML = `
      <style>
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
          min-width: 230px;
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
        .delete-button{
          background-color:D5BDAF;
          width: 70px;
          padding: 8px 8px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-family: "Playfair Display", serif;
          font-size:16px;
        }
        .archive-button{
          background-color:D5BDAF;
          width: 70px;
          padding: 8px 8px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-family: "Playfair Display", serif;
          font-size:16px;
        }
        .delete-button:hover{
          font-weight:bold;
          background-color: F5EBE0;
          border: solid;
          border-color: D5BDAF
        }
        .archive-button:hover{
          font-weight:bold;
          background-color: F5EBE0;
          border: solid;
          border-color: D5BDAF
        }
      </style>
      <div class="container-note-list"> 
        <h2>Daftar Catatan</h2>   
        <div class="notes-list">
        </div>
      </div>
    `;

    this._notes.forEach((note) => {
      this._shadowRoot.querySelector('.notes-list').innerHTML += `
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
          <button class ="delete-button" id="${note.id}">Hapus</button>
          <button class ="archive-button" id="archive-button"> Arsip </button>
        </div>
      `;

      this._shadowRoot.querySelector(`#${note.id}`).addEventListener('click', () => {
        this._eventDeleteNote(note.id);
      });
      this._shadowRoot.querySelector('.archive-button').addEventListener('click',()=>{
        this._eventArchivedNote()
      })
    });
  }
}
customElements.define("note-list", NoteList);