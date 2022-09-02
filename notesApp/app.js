const notes = require('./notes.js')
const yargs = require('yargs')
const chalk = require('chalk')

// Customize yargs command with string
yargs.version('2.3.0')

// Create yargs command to ADD a note
yargs.command({
    command: 'Add',
    describe: 'Adds a new note',
    builder: {
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'String'
        },
        body: {
            describe: 'Content to be added in note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {

        // console.log('\n-------------------');
        // console.log('Title: '+ argv.title);
        // console.log('Body:  '+ argv.body.split(' ').join('\n\t'));

        notes.addNotes(argv.title, argv.body);

    }
})

// Create yargs command to REMOVE a note
yargs.command({
    command: 'Remove',
    describe: 'Removes a new note',
    builder: {
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {

        notes.removeNotes(argv.title)
        // console.log('Removing a new note!');
    }
})

// Create yargs command to LIST a note
yargs.command({
    command: 'List',
    describe: 'Lists of notes',
    handler() {

        notes.listNotes();

    }
})

// Create yargs command to READ a note
yargs.command({
    command: 'Read',
    describe: 'Reads a note',
    builder: {
        title:{
            describe: 'Title of reading note',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title);
    }
})

// console.log(yargs.argv)
yargs.parse()

// -------------------------------------------------------
// const chalk = require('chalk')
// console.log(chalk.yellow('Success!'));
// console.log(chalk.bold.green.inverse('Success!'));

// const command = process.argv
// for (let i = 2; i < 5; i++)
// {
//     console.log(command[i])
// }
// console.log(command[2])

// -------------------------------------------------------
// const getFun= require('./notes.js');                         // create variable of module with require() method to access all the data of file system module
// console.log(getFun())                                         -----------------------!

// -------------------------------------------------------
// const fs = require('fs')
// fs.writeFileSync('notes.txt', 'My first note in Notes App!')   -----------------------!  // wrtieFileSync - override the data
// fs.appendFileSync('notes.txt', '\nIt is a second statement.' )  -----------------------!
// appendFileSync - append the data at the end                     -----------------------!

// -------------------------------------------------------
// const validator = require('validator')
// console.log(validator.isEmail('abc@gmail.com'))                 -----------------------!






