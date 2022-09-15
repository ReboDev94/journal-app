import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDb } from "../../../firebase/config";
import { loadNotes } from "../../../helpers";
import { fileUpload } from "../../../helpers/fileUpload";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotoToActiveNote, deleteNoteById } from './actions'

export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote())
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        const newDoc = doc(collection(FirebaseDb, `${uid}/journal/notes`))
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no esta establecido')
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes))
    }
}

export const startSavingNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving())
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFirebase = { ...note };
        delete noteToFirebase.id;

        const docRef = doc(FirebaseDb, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFirebase, { merge: true })

        dispatch(updateNote(note))
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());

        const fileUploadPromise = [];
        for (const file of files) {
            fileUploadPromise.push(fileUpload(file));
        }
        const urls = await Promise.all(fileUploadPromise);
        dispatch(setPhotoToActiveNote(urls));
    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc(FirebaseDb, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
    }
}