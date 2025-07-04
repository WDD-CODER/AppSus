import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getFilterFromSearchParams,
    onSetNoteParams
}
'use strict';


// LIST
function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.vendor))
            }
            // console.log(' notes:', notes)
            return notes
        })
}


// CREATE

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            _createDemoNote('NoteTxt'),
            _createDemoNote('NoteTxt'),
            _createDemoNote('NoteTxt'),
            _createDemoNote('NoteTxt')
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createDemoNote(type) {
    const curTime = new Date
    const createdAt = { time: curTime.toTimeString(), date: curTime.toDateString() }
    const note = getEmptyNote(type, createdAt)
    note.id = utilService.makeId()
    note.title = utilService.makeLorem(5)
    note.info = { txt: utilService.makeLorem(25) }
    return note
}

//  SAVE 
function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}


// READ
function get(noteId) {
    return storageService.get(NOTE_KEY, noteId).then(_setNextPrevNoteId)
}


function getEmptyNote(type = 'NoteTxt', createdAt) {
    const now = new Date()
    return {
        createdAt: { time: now.toLocaleTimeString(), date: now.toLocaleDateString() },
        type,
        isPinned: false,
        style: { backgroundColor: '#00d' },
        info: { txt: '' }
    }
}

function getDefaultFilter() {
    return { type: '', isPinned: '' }
}

function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const isPinned = searchParams.get('isPinned') || ''
    const noteId = searchParams.get('noteId') || ''

    return {
        txt,
        isPinned,
        noteId
    }
}


// UPDATE
function _setNextPrevNoteId(note) {
    return query().then((notes) => {
        const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
        const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
        const prevNote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
        note.nextNoteId = nextNote.id
        note.prevNoteId = prevNote.id
        return note
    })
}

function onSetNoteParams(note, searchParams, setSearchParams) {
    if (!note.id) return showErrorMsg('seems like there is no not...')

    searchParams.set('txt', (note.info && note.info.txt) || '')
    searchParams.set('type', note.type || '')
    searchParams.set('isPinned', note.isPinned || '')
    searchParams.set('background-Color', note.style.backgroundColor || '')
    searchParams.set('date-createdAt', (note.createdAt && note.createdAt.date) || '')
    searchParams.set('time-createdAt', (note.createdAt && note.createdAt.time) || '')
    setSearchParams(searchParams)
}


// DELETE
function remove(noteId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(NOTE_KEY, noteId)
}
