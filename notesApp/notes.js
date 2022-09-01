const fs = require('fs');           // import the fs module
const chalk = require('chalk')


// Create function to add new notes
const addNotes = (title, body) => {
    const loadedNotes = loadNotes();

    // filter for getting duplicate notes
    const duplicateNote = loadedNotes.find((note) => note.title === title)

    debugger

    // if else loop to check whether it is duplicate or not
    if (!duplicateNote) {
        loadedNotes.push({
            title: title,
            body: body
        })

        saveNotes(loadedNotes);
        console.log('New note added!')
    }
    else {
        console.log('Same title name!');
    }
}

// Create function to remove new notes
const removeNotes = (title) => {

    const loadedNotes = loadNotes();

    // filter for getting duplicate notes
    const notesToKeep = loadedNotes.filter((note) => note.title !== title)
    saveNotes(notesToKeep);

    if (notesToKeep.length < loadedNotes.length) {
        console.log(chalk.green.inverse('Note Removed!'))
    }
    else {
        console.log(chalk.red.inverse('No not found.'))
    }
}

// Create function to list of notes
const listNotes = () => {

    const loadedNotes = loadNotes();

    console.log(chalk.blue.inverse('Below is the list of notes.'));
    loadedNotes.forEach((note) => console.log(note.title))

}

// Create function to read a note
const readNotes = (title) => {

    const loadedNotes = loadNotes();

    const readNote = loadedNotes.find( (note) => note.title === title)

    if ( !readNote ){
        console.log(chalk.red.inverse('No not found!'))
    }
    else{
        console.log(chalk.blue.inverse(readNote.title) + ":" + readNote.body)
    }

}

// Create function that saves the note to json file
const saveNotes = (loadedNotes) => {

    const dataJSON = JSON.stringify(loadedNotes);
    fs.writeFileSync('note.json', dataJSON);
}

// Create function to load every notes
const loadNotes = () => {

    try {
        const dataBuffer = fs.readFileSync('note.json');
        const dataString = dataBuffer.toString();
        return JSON.parse(dataString);
    }
    catch (e) {
        return [];
    }

}

// Export modules to another file
module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}