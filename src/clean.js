const fs = require("fs");
const async = require("async");
const getPackageList = require('./helpers/getPackageList');

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
                fs.rmSync(buildedRoute,{ recursive:true, force: true}); 
                console.log(`\x1b[32m[CLEANED]\x1b[0m Cleaned \x1b[32m${buildedRoute}\x1b[0m directory.`);
            }
        }     
        catch(err){
            if(err.code == 'EPERM' || err.code == 'EEXIST'){
                console.log(`\x1b[33m[NOT CLEANED]\x1b[0m Package \x1b[33m${packageName}\x1b[0m not cleaned. Could not clean dir \x1b[33m${buildedRoute}\x1b[0m. Probably being used by a program.`);
            }
            else{
                console.log(`\x1b[33m[NOT CLEANED]\x1b[0m  Package \x1b[33m${packageName}\x1b[0m not cleaned. ${err}`);
                throw(err);
            }
        }
    });

}
