const fs = require('fs');

let saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let fetchNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes-data.json'));
    } catch (e) {
        return [];
    }
};

let addNote = (title, body) => {
    let notes = fetchNotes();
    var note = {
        title,
        body
    };

    var dups = notes.filter((note) => note.title === title);
    if (dups.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

let getNotes = () => {
    return fetchNotes();
};

let getNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title === title);
    return filteredNotes[0];
};

let removeNote = (title) => {
    var notes = fetchNotes();
    let filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);
    return filteredNotes.length !== notes.length;
};

let logNote = (note) => {
    console.log(`Title: ${note.title}`);
    console.log(`Title: ${note.body}`);
    console.log('--');
};

module.exports = {
    addNote,
    getNotes,
    getNote,
    removeNote,
    logNote
};