const fs = require('fs');
const route = './Packages' ;

async function splitOriginalPackage(package_name, encoding){
    const readStream = fs.createReadStream(`${route}/${package_name}.sql`,{encoding: encoding});
    fs.mkdirSync(`${route}/${package_name}`,{ recursive: true });
    const specWriteStream = fs.createWriteStream(`${route}/${package_name}/${package_name}.sql`,{encoding: encoding})
    const bodyWriteStream = fs.createWriteStream(`${route}/${package_name}/${package_name}_BODY.sql`,{encoding: encoding})
    let bodyStarted = false;
    
    readStream.on('data', (chunk) => {
        const cleanedChunk = cleanChunk(chunk);
        const chunkLines = splitChunkInLines(cleanedChunk);
        const bodyStartLine = chunkLines.findIndex(line => line.match(new RegExp(`CREATE( OR REPLACE)* PACKAGE BODY ${package_name}`,'i')));
        
        if(!bodyStarted){
            bodyStarted = bodyStartLine > -1;
        }
        
        if(bodyStarted){
            if(bodyStartLine > -1){
                //It's the first time that the body definition appears.
                //So I write the first piece on the spec, and the rest on the body.
                specWriteStream.write(chunkLines.slice(0,bodyStartLine - 1).join('\n'));
                bodyWriteStream.write(chunkLines.slice(bodyStartLine,chunkLines.length).join('\n'));
            }
            else{
                bodyWriteStream.write(cleanedChunk);
            }
        }
        else{
            specWriteStream.write(cleanedChunk);
        }
        
    });

    readStream.on('end', ()=>{
        specWriteStream.close();
        bodyWriteStream.close();
    });
}

function cleanChunk(chunk){
    return chunk.replace('/','').trim();
}

function splitChunkInLines(chunk){
    return chunk.split('\n');
}

module.exports = splitOriginalPackage;