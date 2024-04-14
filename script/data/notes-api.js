const BASE_URL = 'https://notes-api.dicoding.dev/v2';
 
const NotesApi = () => {
  const elementListNote = document.querySelector('note-list');
  const elementAppBar = document.querySelector('app-bar');
  const elementFormInput = document.querySelector('form-input');
  const elementSearchNote = document.querySelector('search-note');

  const search = async (word) => {
		try{
			const responseArchived = await fetch(`${BASE_URL}/notes/archived`);
			const responseJSONArchived = await responseArchived.json();
			const responseNonArchived = await fetch(`${BASE_URL}/notes`);
			const responseJSONNonArchived = await responseNonArchived.json();
			const status = responseJSONNonArchived.status == 'fail' || responseJSONArchived.status == 'fail';
			let result = !status ? responseJSONNonArchived.data.concat(responseJSONArchived.data) : [];
			const responseMassege = responseJSONArchived.message + '\n' + responseJSONNonArchived.message;
			if(status){
        setTimeout(() => {
					alert(responseMassege);
				}, 500);
			}else{
        result = result.filter(note => {
					return note.title.includes(word);
				});
				elementListNote.notes = result;
			}
		} catch(error){
			alert(error.stack);
		}
	};

  const getAllNotes = async () => {
    try{
			const responseNonArchived = await fetch(`${BASE_URL}/notes`);
			const responseArchived = await fetch(`${BASE_URL}/notes/archived`);
			const responseJSONNonArchived = await responseNonArchived.json();
			const responseJSONArchived = await responseArchived.json();
			if(responseJSONNonArchived.status == 'fail' || responseJSONArchived.status == 'fail'){
				setTimeout(() => {
					alert(responseJSONNonArchived.message + ', ' + responseJSONArchived.message);
				}, 500);
			}else{
				const allNotes = responseJSONNonArchived.data.concat(responseJSONArchived.data);
				elementListNote.notes = allNotes;
			}
		} catch(error){
			alert(error.stack);
		}
  }

  const getArchivedNotes = async () => {
    try{
			const responseArchived = await fetch(`${BASE_URL}/notes/archived`);
			const responseJSONArchived = await responseArchived.json();
			if(responseJSONArchived.status == 'fail'){
				setTimeout(() => {
					alert(responseJSONArchived.message);
				}, 500);
			}else{
				const allNotes = responseJSONArchived.data;
				elementListNote.notes = allNotes;
			}
		} catch(error){
			alert(error.stack);
		}
  }

  const addNote = async (note) => {
		try{
			const response = await fetch(`${BASE_URL}/notes`, {
				method : 'POST',
				headers: {
					'Content-Type':'application/json'
				},
				body: JSON.stringify(note)
			});
			const responseJSON = await response.json();
			setTimeout(() => {
				alert(responseJSON.message);
			}, 500);
      getAllNotes();
		} catch(error){
			alert(error.stack);
		}
	};

  const deleteNote = async (id) => {
		try{
			const response = await fetch(`${BASE_URL}/notes/${id}`, {
				method : 'DELETE'
			});
			const responseJSON = await response.json();
			setTimeout(() => {
				alert(responseJSON.message);
			}, 500);
      getAllNotes();
		} catch(error){
			alert(error.stack);
		}
	};

  elementSearchNote.eventSearch = search;
  elementFormInput.eventAddNote = addNote;
  elementListNote.eventDeleteNote = deleteNote;
  elementAppBar.eventArchivedNotes = getArchivedNotes;
  getAllNotes();
}

export default NotesApi;