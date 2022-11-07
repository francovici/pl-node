const join = require('./helpers/joiner');
const fs = require("fs");
const async = require("async");
const getPackageList = require('./helpers/getPackageList');
var clc = require("cli-color");

const route = './Packages' ;

module.exports = async function build(packageToBuild) {

    let packages = await getPackageList();

    /* If a package name is send as argument, just build that one */
    if(packageToBuild){
        packages = packages.filter(package => package === packageToBuild);
    }

    async.map(packages, (packageName) => {

        const buildedRoute = `${route}/${packageName}/DEPLOY`;
        const buildedFileName = `${buildedRoute}/${packageName}.sql`;
        
        try{

            fs.mkdirSync(buildedRoute, { recursive: true }); 
        
            // Joining files into the final one:
            join(`${route}/${packageName}`,buildedFileName, 'ascii', true).then(
                () => {
                        console.log(clc.greenBright('[BUILDED]') + ' Package ' + clc.greenBright(packageName) + ' builded at ' + clc.greenBright(buildedFileName))
                    }
                ).catch( (err) => {
                    console.log(clc.yellowBright('[NOT BUILDED]') + ' Package ' + clc.yellowBright(packageName) + ' not builded. ' + err)
                });
        }
        catch(err){
            if(err.code == 'EPERM' || err.code == 'EEXIST'){
                console.log(clc.yellowBright('[NOT BUILDED]') + ' Package ' + clc.yellowBright(packageName) + ' not builded. Could not clean dir ' + clc.yellowBright(buildedRoute) + '. Probably being used by a program.')
            }
            else{
                console.log(clc.yellowBright('[NOT BUILDED]') + ' Package ' + clc.yellowBright(packageName) + ' not builded. ' + err)
                throw(err);
            }
        }
    });

}
