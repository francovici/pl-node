const getPackageList = require("./helpers/getPackageList");
const splitOriginalPackage = require("./helpers/splitters");
const async = require("async");
const clc = require("cli-color");
require('dotenv').config();

async function split(packageToSplit){
    
    if(!process.env.PACKAGE_ENCODING){
        throw clc.yellowBright("Environment variable PACKAGE_ENCODING must be set on .env file. Check Readme.md");
    }

    let loosePackageList = await getPackageList(process.env.PACKAGE_ENCODING, true);

     /* If a package name is send as argument, just split that one */
     if(packageToSplit){
        loosePackageList = loosePackageList.filter(package => package === packageToSplit);
    }

    async.map(loosePackageList, (loosePackageName) => {
        splitOriginalPackage(loosePackageName,process.env.PACKAGE_ENCODING).then(()=>{
            console.log(clc.greenBright('[SPLITTED]') + ` Package ${clc.greenBright(loosePackageName)} splitted into ${clc.greenBright('./Packages/'+loosePackageName)} folder`);
        }).catch((err)=>{
            console.log(clc.yellowBright('[NOT SPLITTED]') + ` Package ${clc.yellowBright(loosePackageName)} couldn't be splitted. ${err}`)
        });
    });

}

module.exports = split;