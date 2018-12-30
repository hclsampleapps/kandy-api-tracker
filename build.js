var fs = require('fs');
var shell = require('shelljs');
var config = require('./config.json');

console.log('Builder   ver 1.0');

console.log('- Delete previous build repository');
shell.rm('-rf', config.destination);

console.log('- Make new build repository');
shell.mkdir('-p', config.destination);

console.log('- Copy package files and directories');
for (let i = 0; i < config.package.length; i++) {
    shell.cp('-R', config.source + config.package[i], config.destination + config.package[i]);
}

console.log('- Create code-base directory');
shell.mkdir(config.destination + config.code.directory);

console.log('- Consolidate code-base files into single file');
let codebase = [];
for (let i = 0; i < config.code.files.length; i++) {
	codebase.push(config.source + config.code.directory + config.code.files[i]);
}
shell.cat(codebase).to(config.destination + config.code.directory + config.code.consolidate);

console.log('Done!');
process.exit(1);