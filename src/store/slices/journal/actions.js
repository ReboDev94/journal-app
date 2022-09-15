import { journalSlice } from ".";
export const {
    addNewEmptyNote,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    clearNotesLogout,
    setPhotoToActiveNote,
} = journalSlice.actions;
