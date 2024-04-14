class NotesInput extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  set eventAddNotes(event){
    this._eventAddNotes = event;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
      <style>
        .form-container {
          margin-top: 70px;
        }
        
        .form-container h2 {
          text-align: center;
          font-size: 2em; 
        }
        form {
          margin-top: 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
        } 
        input[type="text"],
        form textarea {
          padding: 8px 8px;
          margin-top: 20px;
          font-size: 16px;
          display: block;
          margin-left: auto;
          margin-right: auto;
          font-family:"Playfair Display", serif;

        }
        form button {
          margin-top: 20px;
          padding: 8px 8px;
          background-color: D5BDAF;
          border: none;
          border-radius:4px;
          width: 100px;
          cursor: pointer;
          font-size: 15px;
          align-self: center;
          font-family:"Playfair Display", serif;
        }
        input:hover, textarea:hover, button:hover{
          font-weight:bold;
        }
        @media screen and (max-width: 500px) {
          input, textarea {
            width: 60%;
          }
        }
      </style>
      <div class="form-container">
        <h2> Tambahkan Notes</h2>
        <form id="form">
          <div class="form-group">
            <input
            type="text"
            name="input-title"
            id="input-title"
            placeholder="Judul Note"
            size=50
            required
            />
          </div>
        
          <div class="form-group">
            <textarea
            name="input-notes"
            id="input-notes"
            cols="50"
            rows="10"
            placeholder="Deskripsi Note"
            ></textarea>
          </div>
          <button type="submit" id="submit-button">Submit</button>
        </form>
      </div>
    `;

    this._shadowRoot.querySelector('#form').addEventListener('submit', () => {
      const title = this._shadowRoot.querySelector('#input-title').value;
      const body = this._shadowRoot.querySelector('#input-notes').value;

      this._eventAddNotes({ title, body });
    });
  }
}

customElements.define("form-input", NotesInput);
