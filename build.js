const fs = require('fs');
const shell = require('shelljs');
const minimist = require('minimist');
const config = require('./config.json');

class Actions {
    static remakeDest(env) {
        console.log('Remove directory at', env.dest);
        shell.rm('-rf', env.dest);

        console.log('Make new directory at', env.dest);
        shell.mkdir('-p', env.dest);
    }
    static makeDir(env, dir) {
        console.log('Make new directory at', env.dest + dir);
        shell.mkdir('-p', env.dest + dir);
    }
    static copyPkg(env, pkg) {
        console.log('Copy package files and directories to', env.dest);
        for (let i = 0; i < pkg.length; i++) {
            shell.cp('-R', env.src + pkg[i], env.dest + pkg[i]);
        }
    }
    static consolidateCode(env, code) {
        console.log('Create code-base directory at', env.dest);
        shell.mkdir(env.dest + code.directory);

        console.log('Consolidate code-base files into single file');
        let codebase = [];
        for (let i = 0; i < code.files.length; i++) {
            codebase.push(env.src + code.directory + code.files[i]);
        }
        shell.cat(codebase).to(env.dest + code.directory + code.consolidate);
    }
    static replaceText(env, file, oldtext, newtext) {
        console.log('Replace text in', file);
        shell.sed('-i', oldtext, newtext, env.dest + file);
    }
    static renameDir(env, oldname, newname) {
        console.log('Rename directory from', oldname, 'to', newname);
        shell.mv(env.dest + oldname, env.dest + newname);
    }
}

function taskEval(env, str) {
    if (str.indexOf('->') >= 0) {
        let tokens = str.split('->');
        let action = tokens[0].trim();
        let params = tokens[1].split(/(,\s*)/);
        for (let i = 0; i < params.length; i++) {
            params[i] = params[i].trim();
            if (params[i] == ',') {
                params.splice(i,1);
            } else {
                if (params[i].indexOf('root') >= 0) {
                    params[i] = eval(params[i].replace('root', 'config'));
                }
            }
        }
        params.splice(0, 0, env);
        Actions[action].apply(null, params);
    } else {
        console.error('Error: Invalid task statement.\n (at taskEval)', str);
    }
}

console.log('Builder   ver 1.1');

var argv = minimist(process.argv.slice(2));

if (argv.h || argv.help) {
    console.log(`
 Options:
   --help     -h        Help
   --publish  -p        Publish
	`);
} else if (argv.p || argv.publish) {
    console.log('Generating build for web hosting');
    let environment = {
        src: config.source,
        dest: config.build.web.destination
    };
    for (let i = 0; i < config.build.web.task.length; i++) {
        console.log('\nTask#' + (i + 1), config.build.web.task[i]);
        taskEval(environment, config.build.web.task[i]);
    }
} else {
    console.log('Generating standalone build');
    let environment = {
        src: config.source,
        dest: config.build.bin.destination
    };
    for (let i = 0; i < config.build.bin.task.length; i++) {
        console.log('\nTask#' + (i + 1), config.build.bin.task[i]);
        taskEval(environment, config.build.bin.task[i]);
    }
}

console.log('\nDone!');
process.exit(1);