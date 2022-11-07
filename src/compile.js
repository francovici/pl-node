const oracledb = require('oracledb');
require('dotenv').config();
const async = require("async");
var clc = require("cli-color");


const packageHeadAndBody = require('./helpers/getPackageHeadAndBody');
const getPackageList = require('./helpers/getPackageList');

module.exports = function compile(packageToCompile) {

    let connection = null;
        
    if(!process.env.ORACLE_USER){
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
        if(packageToCompile){
            packages = packages.filter(package => package === packageToCompile);
        }

        async.map(packages,(packageName) => {
            
            //Compiling spec
            connection.execute(packageHeadAndBody.getPackageHead(packageName),{},
            async (specError,result)=>{
                if(specError){
                    console.log( clc.yellowBright('[COMPILE FAILED]') + ' Package ' + clc.yellowBright(packageName) + ' not compiled.');
                    console.log(specError);
                }
                else{
                    //Compiling body
                    connection.execute(packageHeadAndBody.getPackageBody(packageName),{},
                    (error,result)=>{
                        if(error){
                            console.log(clc.yellowBright('[COMPILE FAILED]') + ' Package ' + clc.yellowBright(packageName) + ' not compiled.');
                            console.log(error);
                        }
                        else{
                            console.log(clc.greenBright('[COMPILED]') + ' Package ' + clc.greenBright(`${process.env.ORACLE_USER}.${packageName}`) + ' compiled.');
                        }
                    });
                }
            });
        });
    }, (error) => {
        console.log(clc.yellowBright('[COMPILE FAILED]') + ' Package not compiled.');
        console.log(error);
    });

}