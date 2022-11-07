const fs = require("fs");
const async = require("async");
const getPackageList = require('./helpers/getPackageList');
var clc = require("cli-color");

const route = './Packages' ; 

module.exports = async function clean(packageToClean) {

    let packages = await getPackageList();

    /* If a package name is send as argument, just build that one */
    if(packageToClean){
        packages = packages.filter(package => package === packageToClean);
    }

    async.map(packages, (packageName) => {

        const buildedRoute = `${route}/${packageName}/DEPLOY`;
        
        try{
            // Cleaning DEPLOY dir:
            if(fs.existsSync(buildedRoute)){
                fs.rmSync(buildedRoute, { recursive : true });
                console.log(clc.greenBright('[CLEANED]') + ' Cleaned ' + clc.greenBright(buildedRoute) + ' directory.')
            }
        }     
        catch(err){
            if(err.code == 'EPERM' || err.code == 'EEXIST'){
                console.log(clc.yellowBright('[NOT CLEANED]') + ' Package ' + clc.yellowBright(packageName) + ' not cleaned. Could not clean dir ' + clc.yellowBright(buildedRoute) + '. Probably being used by a program.');
            }
            else{
                console.log(clc.yellowBright('[NOT CLEANED]') + ' Package ' + clc.yellowBright(packageName) + ' not cleaned. ' + err)
                throw(err);
            }
        }
    });

}
