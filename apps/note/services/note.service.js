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
    getFilterFromSearchParams
}

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

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId).then(_setNextPrevNoteId)
}

function remove(noteId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(type = 'NoteTxt', createdAt) {
    const now = new Date()
    return {
        createdAt:{time: now.toLocaleTimeString(), date: now.toLocaleDateString()},
        type,
        isPinned: false,
        style: { backgroundColor: '#00d' },
        info: { text: ''}
    }
}

function getDefaultFilter() {
    return { type: '', isPinned: '' }
}



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
    note.info.txt = utilService.makeLorem(25)
    console.log("🚀 ~ _createDemoNote ~ note:", note)
    return note
}



function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const isPinned = searchParams.get('isPinned') || ''

    return {
        txt,
        isPinned
    }
}


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


