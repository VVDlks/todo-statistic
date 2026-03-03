const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();
let todo = []

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function GetTodos() {
    const todos = [];
    for (const file of files) {
        for (const str of file.split('\n')){
            const idx = str.indexOf('// TODO ')
            if (idx !== -1) {
                todo.push(str.slice(idx));
            }
        }
    }
    return todos;
}
function processCommand(command) {
    todo = GetTodos();

    const parts = command.split(' ');
    switch (parts[0]) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            console.log(todo)
            break;
        case 'important':
            handleImportant();
            break;
        case 'user':
            handleUser(parts);
            break;
        case 'sort':
            switch (parts[1]) {
                case 'importance':
                    const sorted = sortInstance(todo);
                    console.log(sorted);
                    break;
                default:
                    console.log('wrong command');
                    break;
            }
            break;
        default:
            console.log('wrong command');
            break;
    }

}

function handleImportant() {
    let important_commands = [];
    let commands = todo;
    for (let command of commands) {
        if (command.indexOf('!') !== -1) {
            important_commands.push(command);
        }
    }
    for (let n = 0; n < important_commands.length; n++) {
        console.log(important_commands[n]);
    }
}

function handleUser(username) {
    if (username.length != 2) {
        console.log('wrong command');
        return;
    }
    const regex = new RegExp(`\/\/ TODO ${username};([^;]*);([^;]*)`, 'i')
    for (const str of todo) {
        if (regex.test(str)) {
            console.log(str);
        }
    }
}

function sortInstance(arr) {
    const copyArr = [...arr];
    return copyArr.sort((a, b) => {
        const countA = countInstance(a);
        const countB = countInstance(b);
        return countB - countA;
    });
}

function countInstance(line){
    let count = 0;
    let index = line.indexOf('!');
    while (index !== -1) {
        count++;
        index = line.indexOf('!', index + 1);
    }
    return count;
}

// TODO you can do it!
