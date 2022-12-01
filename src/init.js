const fs = require("fs");
const inquirer = require('inquirer');
var path = require('path');
const clc = require('cli-color');
const { createProjectOnDir } = require('./helpers/projectFactory');

module.exports = (outputDir) => {

    //TODO: check dirs and files first.
    //TODO: Try catch
    let dirPath = './';
    if(outputDir){
        dirPath = `./${outputDir}/`;
        if(fs.existsSync(path.resolve(dirPath))){
            console.log(`${clc.yellowBright('Warning:')} Directory already exists.`)

            askYesOrNoQuestion('confirm_creating_on_dir','Would you like to initialize the project there anyway? (y/N)',
            () => {
                createProjectOnDir(dirPath);
            },
            () => {
                console.log('[INFO] Please initialize it at a different directory.');
                throw 'Project was not initialized';
            },
            (error) => {
                console.log( clc.yellowBright('[NOT INITIALIZED] ') + error);
            })
        }
        else{
            createProjectOnDir(dirPath);
        }
    }
    else{
        console.log('');
        console.log(clc.underline('Current directory'));
        console.log(path.resolve('./'));
        console.log('');

        askYesOrNoQuestion('use_dir_anyway','Would you like to initialize a project in the current directory? (y/N)',
        () => {
            createProjectOnDir(dirPath)
        },
        () => {
            console.log('');
            console.log('[INFO] Project was not initialized');
        },
        (error) => {
            console.log(error);
            console.log( clc.yellowBright('[NOT INITIALIZED]') + ' Project was not initialized');
        })
    }

}

function askYesOrNoQuestion(question_id, message, yes_handler, no_handler, error_handler){
    inquirer.prompt([{
        name: question_id,   
        message: message
    }
    ])
    .then((answer) => {
        if(answer[question_id].toUpperCase() != 'Y'){
            no_handler();
        }
        else{
            yes_handler();
        }
    })
    .catch((error) => {
        error_handler(error);
    })
}