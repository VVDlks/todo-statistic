const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();
const todo = []

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    for (const file of files) {
        for (const str of file.split('\n')){
            const idx = str.indexOf('// TODO ')
            if (idx !== -1) {
                todo.push(str.slice(idx));
            }
        }
    }

    if (command === 'exit') {
        process.exit(0);
    } else if (command.startsWith('user ')) {
        getByUsername(command.slice(5));
    } else {
        console.log('wrong command');
    }
}

function getByUsername(username) {
    const regex = new RegExp(`\/\/ TODO ${username};([^;]*);([^;]*)`, 'i')
    for (const str of todo) {
        if (regex.test(str)) {
            console.log(str);
        }
    }
}

// TODO you can do it!
