const oracledb = require('oracledb');
require('dotenv').config();
const async = require("async");

const packageHeadAndBody = require('./helpers/getPackageHeadAndBody');
const getPackageList = require('./helpers/getPackageList');

let connection = null;

if(!process.env.ORACLE_USER){
    console.log(`\x1b[33m[COMPILE FAILED]\x1b[0m  Package \x1b[33m${packageName}\x1b[0m not compiled.`);
    throw "\x1b[33mEnvironment variables must be set for compiling. Check Readme.md\x1b[0m";
}

/* Connect */
oracledb.getConnection({
    user: process.env.ORACLE_USER,
    password: process.env.PASSWORD,
    connectionString: process.env.CONNECTSTRING,
}).then(async (conn) => {
    connection = conn;
    
    /* Compiling all Packages*/
    let packages = await getPackageList();
    
    /* If a package name is send as argument, just build that one */
    const packageToBuild = process.env.npm_config_p ? process.env.npm_config_p : process.env.npm_config_package ? process.env.npm_config_package : null;
    if(packageToBuild){
        packages = packages.filter(package => package === packageToBuild);
    }

    async.map(packages,(packageName) => {
        
        //Compiling spec
        connection.execute(packageHeadAndBody.getPackageHead(packageName),{},
        async (specError,result)=>{
            if(specError){
                console.log(`\x1b[33m[COMPILE FAILED]\x1b[0m  Package \x1b[33m${packageName}\x1b[0m not compiled.`);
                console.log(specError);
            }
            else{
                //Compiling body
                connection.execute(packageHeadAndBody.getPackageBody(packageName),{},
                (error,result)=>{
                    if(error){
                        console.log(`\x1b[33m[COMPILE FAILED]\x1b[0m  Package \x1b[33m${packageName}\x1b[0m not compiled.`);
                        console.log(error);
                    }
                    else{
                        console.log(`\x1b[32m[COMPILED]\x1b[0m Package \x1b[32m${process.env.ORACLE_USER}.${packageName}\x1b[0m compiled`);
                    }
                });
            }
        });
    });
}, (error) => {
    console.log(`\x1b[33m[COMPILE FAILED]\x1b[0m Package not compiled.`);
    console.log(error);
});
