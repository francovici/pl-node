const fs = require("fs");
var path = require('path');

module.exports = (outputDir) => {

    //TODO: check dirs and files first.
    //TODO: Try catch, some output
    let dirPath = './';
    if(outputDir){
        dirPath = `./${outputDir}/`;
    }
    
    fs.mkdirSync(path.resolve(`${dirPath}Packages`), { recursive: true }); 
    fs.mkdirSync(path.resolve(`${dirPath}src`), { recursive: true }); 
    fs.writeFileSync(path.resolve(`${dirPath}.env`),"ORACLE_USER=''\nPASSWORD=''\nCONNECTSTRING=''"); 
    fs.mkdirSync(path.resolve(`${dirPath}tests`), { recursive: true }); 
}

