export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getRandomColor,
    padNum,
    getDayName,
    getMonthName,
    loadFromStorage,
    saveToStorage,
    debounce,
    getTruthyValues,
    formatTimeOrDate,
    getFullDateAndTime,
    animateCSS,
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    const val = localStorage.getItem(key)
    return JSON.parse(val)
}

function makeId(length = 6) {
    var txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}


function getMonthName(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[date.getMonth()]
}

export function debounce(func, delay) {
    
    let timeoutId
    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            console.log('debounce')
            func(...args)
        }, delay)
    }
}

export function getTruthyValues(obj) {
    const newObj = {}
    for (const key in obj) {
        const value = obj[key]
        if (value) {
            newObj[key] = value
        }
    }
    return newObj
}


function formatTimeOrDate(timestamp) {
    if (!timestamp) return 'Not Sent'
    const now = Date.now()
    const twentyFourHours = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
    const oneYear = 365 * 24 * 60 * 60 * 1000 // Approximately 1 year in milliseconds (ignoring leap years for simplicity)

    const date = new Date(timestamp)
    const diff = now - timestamp // Difference in milliseconds

    // Options for month names
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    if (diff <= twentyFourHours) {
        // Within the last 24 hours, return time in HH:MM format
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`

    } else if (diff < oneYear) {
        // More than 24 hours but less than 1 year ago, return date like "June 12"
        const month = monthNames[date.getMonth()]
        const day = date.getDate()
        return `${month} ${day}`

    } else {
        // More than 1 year ago, return date in DD-MM-YYYY format
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')
        return `${day}-${month}-${year}`
    }


    
}

function getFullDateAndTime(timestamp) {
    if (!timestamp) return 'Not Sent Yet'
    const date = new Date(timestamp)
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const day = date.getDate()
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()

    return `${day} ${month} ${year}, ${hours}:${minutes}`
}

export function animateCSS(el, animation = 'bounce', isRemoveClass = true) {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`
        el.classList.add(`${prefix}animated`, animationName)

        function handleAnimationEnd(ev) {
            ev.stopPropagation()
            if (isRemoveClass) el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }

        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}
