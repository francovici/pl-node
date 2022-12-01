const oracledb = require('oracledb');
require('dotenv').config();
const async = require("async");
var clc = require("cli-color");


const packageHeadAndBody = require('./helpers/getPackageHeadAndBody');
const getPackageList = require('./helpers/getPackageList');

function compile(packageToCompile) {

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
            connection.execute(packageHeadAndBody.getPackageHead(packageName)).then(
                () =>{
                    throwCompilationErrorIfExists(connection,packageName,'PACKAGE')
                    .then(() => {
                        
                        //Compiling body
                        connection.execute(packageHeadAndBody.getPackageBody(packageName)).then(
                            () => {
                                throwCompilationErrorIfExists(connection,packageName,'PACKAGE BODY')
                                .then(
                                    (packageName)=>{
                                        console.log(clc.greenBright('[COMPILED]') + ' Package ' + clc.greenBright(`${process.env.ORACLE_USER}.${packageName}`) + ' compiled.');
                                    }
                                ).catch(
                                    /* Body Compilation error */
                                    (error)=>{
                                    console.log(clc.yellowBright('[COMPILE FAILED]') + ' Package ' + clc.yellowBright(packageName) + ' not compiled.');
                                    console.log(error);
                                });
                            }
                        ).catch(
                            /* Body Common execution error */
                            (error) => {
                                console.log(clc.yellowBright('[COMPILE FAILED]') + ' Package ' + clc.yellowBright(packageName) + ' not compiled.');
                                console.log(error);
                            }
                        );
                    }).catch(
                        /* Head Compilation error */
                        (error)=>{
                        console.log(clc.yellowBright('[COMPILE FAILED]') + ' Package ' + clc.yellowBright(packageName) + ' not compiled.');
                        console.log(error);
                    });
                },
                (error)=> {
                    /* Head Common execution error */
                    console.log( clc.yellowBright('[COMPILE FAILED]') + ' Package ' + clc.yellowBright(packageName) + ' not compiled.');
                    console.log(specError);
                }
            )
        });
    }, (error) => {
        console.log(clc.yellowBright('[COMPILE FAILED]') + ' Package not compiled.');
        console.log(error);
    });

}

async function throwCompilationErrorIfExists(connection,packageName,errorType){
    const result = await connection.execute('SELECT * FROM user_errors');
 
    if(result.rows.length > 0){
        const errorRecord = result.rows[0];
        const name = errorRecord[0];
        const type = errorRecord[1];
        if(name==packageName && type==errorType){
            const line = errorRecord[3];
            const position = errorRecord[4];
            const text = errorRecord[5];

            throw (`Error on ${type} line ${line} pos ${position} : ${text}`);
        }
    }
    else{
        Promise.resolve(packageName);
    }   
}

module.exports = compile;