
const clc = require('cli-color');
var path = require('path');
const fs = require("fs");
const { exit } = require('process');

/* Getting pl-node root dir from any working directory */
let arrPath = path.parse(__dirname).dir.split(path.sep);
arrPath.pop();
const binaryPath = path.join(...arrPath);

function createProjectOnDir(dirPath){
    
    console.log('');
    console.log( clc.black(clc.bgBlue('--- CREATING PROJECT ---')));
    console.log('');
    console.log('On: ' + path.resolve(`${dirPath}`))
    console.log('');
    
    createProjectFolder(dirPath,'');
    createProjectFolder(dirPath,'Packages');
    createProjectFolder(dirPath,'src');
    createProjectFolder(dirPath,'tests');
    copyProjectAsset(path.resolve(`${binaryPath}/assets/env`),dirPath,'.env'); 
    copyProjectAsset(path.resolve(`${binaryPath}/assets/gitignore`),dirPath,'.gitignore'); 
    copyProjectAsset(path.resolve(`${binaryPath}/assets/package`),dirPath,'package.json'); 
}

function createProjectFolder(dir,name,_options){
    try{
        fs.mkdirSync(path.resolve(`${dir}${name}`),_options);
        if(name){
            console.log(clc.greenBright('/'+name) + ' created');
        }
    }
    catch(err){
        if (!err === 'EEXIST'){
            throw err;
        }
        else{
            if(name){
                console.log(clc.blueBright('/'+name) + ' already exists. Skipped.');
            }
        }
    }
}   
function createProjectFile(dir,name,_contents,_options){
    try{
        fs.writeFileSync(path.resolve(`${dir}${name}`),_contents,_options); 
        console.log(clc.greenBright(name) + ' created');
    }
    catch(err){
        if (!err === 'EEXIST'){
            throw err;
        }
        else{
            if(name){
                console.log(clc.blueBright(name) + ' already exists. Skipped.');
            }
        }
    }
}   
function copyProjectAsset(assetPath,destinationDir,newName){
    try{
        fs.copyFileSync(assetPath,path.resolve(`${destinationDir}${newName}`),fs.constants.COPYFILE_EXCL);
        console.log(clc.greenBright(newName) + ' created');
    }
    catch(err){
        if (!err === 'EEXIST'){
            throw err;
        }
        else{
            if(newName){
                console.log(clc.blueBright(newName) + ' already exists. Skipped.');
            }
        }
    }
}   

module.exports = {copyProjectAsset, createProjectFile, createProjectFolder, createProjectOnDir}