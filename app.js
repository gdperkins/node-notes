const yargs = require('yargs');

const titleRules = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
};

const args = yargs
    .command('add', 'Add a new note.', {
        title: titleRules,
        body: {
            describe: 'Note content',
            demand: true,
            alias: 'd'
        }
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleRules
    })
    .command('remove', 'Removes a note', {
        title: titleRules
    })
    .help()
    .argv;

const notes = require('./notes');

let command = args._[0];
if (command === 'add'){
    var note = notes.addNote(args.title, args.body);
    if (note) {
        console.log('Added note.');
        console.log(`Title: ${note.title}`);
    } else {
        console.log('Duplicate note');
    }
} else if (command === 'list') {
    var all = notes.getNotes();
    console.log(`Notes length: ${all.length}`);
    all.forEach(note => {
        notes.logNote(note);
    });

} else if (command === 'read') {
    var note = notes.getNote(args.title);
    if (note) {
        notes.logNote(note);
    } else {
        console.log('Note not found');
    }
} else if (command === 'remove') {
    if (notes.removeNote(args.title)) {
        console.log('Note removed.');
    } else {
        console.log('Note not found.');
    }

} else {
    console.log('Command not recognized');
}