import "../components/app-bar.js";
import "../components/form-input.js";
import "../components/note-list.js";
import "../components/search-note.js";

// customElements.whenDefined("note-list").then(() => {
//     const noteList = document.querySelector("note-list");
//     noteList.render()
// });

customElements.whenDefined("form-input").then(() => {
    document.querySelector("form-input").addEventListener("submit", (event) => {
        notesData.push(event.detail);
        // Setelah menambahkan data baru, perbarui properti 'note' di 'note-list'
        const noteList = document.querySelector("note-list");
        noteList.render()
    });
});
