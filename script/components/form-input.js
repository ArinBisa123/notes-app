class NotesInput extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _notes = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }
  _updateStyle() {
    this._style.textContent = `
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
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }
  set notes(value) {
    this._notes = value;
 
    // Render ulang
    this.render();
  }
 
  get notes() {
    return this._notes;
  }
  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="form-container">
        <h2> Tambahkan Notes</h2>
        <form id="form">
          <div class="form-group">
            <input
            type="text"
            name="input-title"
            id="input-title"
            placeholder="Judul Note"
            maxlength="100"
            size=50
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

    const submitButton = this._shadowRoot.getElementById("submit-button");
    submitButton.addEventListener("submit", (event) => {
      event.preventDefault();
      
      const inputTitle = this._shadowRoot.getElementById("input-title").value;
      const inputNote = this._shadowRoot.getElementById("input-notes").value;

      const addNote = {
        title: inputTitle,
        body: inputNote,
        createdAt: new Date().toISOString(),
        archived: false,
      };

      this.dispatchEvent(new CustomEvent("addNewNote", { detail: addNote }));
      console.log(inputTitle)
      console.log(inputNote)
    });
  }
}

customElements.define("form-input", NotesInput);
