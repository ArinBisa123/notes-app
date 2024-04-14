const BASE_URL = 'https://notes-api.dicoding.dev/v2';
 
const NotesApi = () => {
  const elementListNote = document.querySelector('note-list');
  const elementArchiveNote= document.querySelector('archive-note');
  const elementFormInput = document.querySelector('form-input');
  const elementSearchNote = document.querySelector('search-note');
	const elementLoading = document.querySelector('loading-indicator')
  const search = async (word) => {
		try{
			elementLoading.hidden=false
			const archivedResponse = await fetch(`${BASE_URL}/notes/archived`);
			const JSONArchived = await archivedResponse.json();
			const nonArchivedResponse = await fetch(`${BASE_URL}/notes`);
			const JSONNonArchived = await nonArchivedResponse.json();
			const status = JSONNonArchived.status == 'fail' || JSONArchived.status == 'fail';
			let result = !status ? JSONNonArchived.data.concat(JSONArchived.data) : [];
			const messageResponse = JSONArchived.message + '\n' + JSONNonArchived.message;
			if(status){
        setTimeout(() => {
					alert(messageResponse);
					elementLoading.hidden=true
				}, 500);
			}else{
        const archiveNote= result.filter(note => {
					return note.title.includes(word)&& note.archived;
				});
				const nonArchiveNote = result.filter(note => {
					return note.title.includes(word)&& !note.archived;
				})
				elementListNote.notes = nonArchiveNote;
				elementArchiveNote.notes=archiveNote
				elementLoading.hidden=true
			}
		} catch(error){
			alert(error.stack);
		}
	};

  const getAllNotes = async () => {
    try{
			const nonArchivedResponse = await fetch(`${BASE_URL}/notes`);
			const archivedResponse = await fetch(`${BASE_URL}/notes/archived`);
			const JSONNonArchived = await nonArchivedResponse.json();
			const JSONArchived = await archivedResponse.json();
			if(JSONNonArchived.status == 'fail' || JSONArchived.status == 'fail'){
				setTimeout(() => {
					alert(JSONNonArchived.message + ', ' + JSONArchived.message);
				}, 500);
			}else{
				const allNotes = JSONNonArchived.data.concat(JSONArchived.data);
				elementListNote.notes = allNotes;
			}
		} catch(error){
			alert(error.stack);
		}
  }
	const archiveNotes= async (id) =>{
		try{
			const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
				method : 'POST',
			});
			const responseJSON = await response.json();
			setTimeout(() => {
				alert(responseJSON.message);
			}, 500);
			getAllNotes()
			getArchivedNotes()
		} catch(error){
			alert(error.stack);
		}
	}
	const unArchiveNote = async (id) => {
		try{
			const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
				method : 'POST',
			});
			const responseJSON = await response.json();
			setTimeout(() => {
				alert(responseJSON.message);
			}, 500);

			getAllNotes();
			getArchivedNotes();
		} catch(error){
			alert(error.stack);
		}
	};


  const getArchivedNotes = async () => {
    try{
			const archivedResponse = await fetch(`${BASE_URL}/notes/archived`);
			const JSONArchived = await archivedResponse.json();
			if(JSONArchived.status == 'fail'){
				setTimeout(() => {
					alert(JSONArchived.message);
				}, 500);
			}else{
				const archiveNote = JSONArchived.data;
				elementArchiveNote.notes = archiveNote;
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
			getArchivedNotes()
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
			getArchivedNotes()
		} catch(error){
			alert(error.stack);
		}
	};

  elementSearchNote.eventSearch = search;
  elementFormInput.eventAddNotes = addNote;
  elementListNote.eventDeleteNote = deleteNote;
  elementListNote.eventArchivedNote = archiveNotes;
	elementArchiveNote.eventNonArchivedNotes= unArchiveNote
	elementArchiveNote.eventDeleteNote=deleteNote
  getAllNotes();
	getArchivedNotes()
}

export default NotesApi;