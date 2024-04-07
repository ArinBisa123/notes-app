import "../components/app-bar.js";
import "../components/form-input.js";
import "../components/note-list.js";
import "../components/search-note.js";
import notesData from "../data/notes-data.js";

customElements.whenDefined("form-input").then(() => {
    document.querySelector("form-input").addEventListener("addNewNote", (event) => {
        notesData.push(event.detail)
        const noteList = document.querySelector("note-list");
        noteList.render()
    });
});
