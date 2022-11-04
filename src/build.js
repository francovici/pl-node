const join = require('./helpers/joiner');
const fs = require("fs");
const async = require("async");
const getPackageList = require('./helpers/getPackageList');

const route = './Packages' ;

async function build() {

    let packages = await getPackageList();

    /* If a package name is send as argument, just build that one */
    const packageToBuild = process.env.npm_config_p ? process.env.npm_config_p : process.env.npm_config_package ? process.env.npm_config_package : null;
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
                        console.log(`\x1b[32m[BUILDED]\x1b[0m Package \x1b[32m${packageName}\x1b[0m builded at ${buildedFileName}`);
                    }
                ).catch( (err) => {
                    console.log(`\x1b[33m[NOT BUILDED]\x1b[0m Package \x1b[33m${packageName}\x1b[0m not builded. ${err}`);
                });
        }
        catch(err){
            if(err.code == 'EPERM' || err.code == 'EEXIST'){
                console.log(`\x1b[33m[NOT BUILDED]\x1b[0m Package \x1b[33m${packageName}\x1b[0m not builded. Could not clean dir \x1b[33m${buildedRoute}\x1b[0m. Probably being used by a program.`);
            }
            else{
                console.log(`\x1b[33m[NOT BUILDED]\x1b[0m  Package \x1b[33m${packageName}\x1b[0m not builded. ${err}`);
                throw(err);
            }
        }
    });

}

build();
