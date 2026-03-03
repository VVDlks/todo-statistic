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

    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'important':
            let important_commands = []
            let commands = todo
            for(let command of commands) {
                if(command.indexOf('!') !== -1) {
                    important_commands.push(command)
                }
            }
            for(let n = 0; n < important_commands.length; n++) {
                console.log(important_commands[n])
            }
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!