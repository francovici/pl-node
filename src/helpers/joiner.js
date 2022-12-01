const fs = require("fs");
const async = require("async");
const path = require("path");

module.exports = async function(directory, destination,readEncoding,addSlashes) {

    try{

        let files = await fs.readdirSync(directory,{withFileTypes: true, encoding: readEncoding});

        files = files.filter(file => file.isFile());
        files = files.map(file => path.join(directory,file.name));

        if(files.length != 2) {
            throw "Both Spec and Body files (and only those two) must exist in folder in order to build Package.";
        }

        //Read all files in parallel
        await async.map(files, fs.readFile, (err, results) => {
            if (err)
                throw err;

            //Join spec and body
            let joined;
            if(addSlashes){
                joined = results.join("\n/\n\n");
                joined = joined + '\n/';
            }
            else{
                joined = results.join("\n\n");
            }

             //Write the joined results to destination (in ascii/ANSI)
            fs.appendFile(destination, joined, {encoding: 'ascii'} , (err) => {
                if (err)
                    throw err;
                return true;
            });
        
        });
    }
    catch(err){
        throw err;
    }
    
}