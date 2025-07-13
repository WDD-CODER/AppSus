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
    onSetNoteParams,
    getFilterBySearchParams
}


// LIST
function query(filterBy = {}) {
    
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.title))
            }

            if (filterBy.archive) {
                notes = notes.filter(note => note.archive === true)
            }
            else notes = notes.filter(note => note.archive !== true)

            return notes
        })
          .catch(() => showErrorMsg('Failed loading notes'))
    }

function getFilterBySearchParams(searchParams) {
    const filterType = searchParams.get('filterBy') || ''
    const filterBy = {}

    if (filterType === 'archive') filterBy.archive = true
    return filterBy
}

// CREATE

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            _createDemoNote('NoteTxt'),
            _createDemoNote('NoteTxt'),
            _createDemoNote('NoteTxt'),
            _createDemoNote('NoteTxt'),
            _createDemoNote('NoteTxt'),
            _createDemoNote('NoteTxt'),
            _createDemoNote('NoteTxt'),
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
    const color = getComputedStyle(document.documentElement)
                  .getPropertyValue('--clr-bg-main')
                  .trim();
    const now = new Date()
    return {
        createdAt: { time: now.toLocaleTimeString(), date: now.toLocaleDateString() },
        type,
        isPinned: false,
        style: { backgroundColor: color },
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

function onSetNoteParams(note, data, func ) {
    if (!note.id) return showErrorMsg('seems like there is no not...')
    // data.set('txt', (note.info && note.info.txt) || '')
    // data.set('type', note.type || '')
    // data.set('isPinned', note.isPinned || '')
    // data.set('background-color', note.style.backgroundColor || '')
    // data.set('background-image', note.style.backgroundImage || '')
    data.set('date-createdAt', (note.createdAt && note.createdAt.date) || '')
    data.set('time-createdAt', (note.createdAt && note.createdAt.time) || '')
    // return Promise.resolve(func(data))
    func(data)
}


// DELETE
function remove(noteId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(NOTE_KEY, noteId)
}

