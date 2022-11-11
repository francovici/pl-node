const fs = require("fs");
const inquirer = require('inquirer');
var path = require('path');
const clc = require('cli-color');
import { exit } from 'process';

module.exports = (outputDir) => {

    //TODO: check dirs and files first.
    //TODO: Try catch
    let dirPath = './';
    if(outputDir){
        dirPath = `./${outputDir}/`;
        createProjectOnDir(dirPath);
    }
    else{
        console.log('');
        console.log(clc.underline('Current folder'));
        console.log(path.resolve('./'));
        console.log('');
        inquirer.prompt([{
            name: 'use_current_dir',   
            message: 'Would you like to initialize a project in the current folder? (Y/n)'
        }
        ])
        .then((answer) => {
            if(answer.use_current_dir.toUpperCase() != 'Y'){
                console.log('');
                console.log('[INFO] Project was not initialized');
                exit(1);
            }
            else{
                createProjectOnDir(dirPath);
            }
        })
        .catch((error) => {
            console.log(error);
            console.log( clc.yellowBright('[NOT INITIALIZED]') + ' Project was not initialized');
        })
    }

}

function createProjectOnDir(dirPath){
    console.log('');
    console.log( clc.black(clc.bgBlue('--- CREATING PROJECT ---')));
    console.log('');
    console.log('On folder: ' + path.resolve(`${dirPath}`))
    console.log('');
    
    createProjectFolder(dirPath,'Packages', { recursive: true });
    createProjectFolder(dirPath,'src', { recursive: true }); 
    createProjectFolder(dirPath,'tests', { recursive: true }); 
    createProjectFile(dirPath,'.env',"ORACLE_USER=''\nPASSWORD=''\nCONNECTSTRING=''"); 
}

function createProjectFolder(dir,name,_options){
    fs.mkdirSync(path.resolve(`${dir}${name}`),_options);
    console.log(clc.greenBright('/'+name) + ' created');
}   
function createProjectFile(dir,name,_contents,_options){
    fs.writeFileSync(path.resolve(`${dir}${name}`),_contents,_options); 
    console.log(clc.greenBright(name) + ' created');
}   
