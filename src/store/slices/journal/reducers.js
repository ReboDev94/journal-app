const reducers = {
    savingNewNote: (state, action) => {
        state.isSaving = true
    },
    addNewEmptyNote: (state, action) => {
        state.notes.push(action.payload);
        state.isSaving = false;
    },
    setActiveNote: (state, action) => {
        state.active = action.payload
        state.messageSaved = ''

    },
    setNotes: (state, action) => {
        state.notes = action.payload
    },
    setSaving: (state) => {
        state.isSaving = true;
        state.messageSaved = ''
    },
    updateNote: (state, action) => {
        const newNote = action.payload;
        state.isSaving = false;
        state.notes = state.notes.map((note) => note.id === newNote.id ? newNote : note);
        state.messageSaved = `${newNote.title}, actualizada correctamente.`
    },
    setPhotoToActiveNote: (state, action) => {
        state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
        state.isSaving = false;
    },
    clearNotesLogout: (state) => {
        state.isSaving = false;
        state.messageSaved = '';
        state.notes = [];
        state.active = null;
    },
    deleteNoteById: (state, action) => {
        state.active = null;
        state.notes = state.notes.filter((note) => note.id !== action.payload);
    }
};

export default reducers;
