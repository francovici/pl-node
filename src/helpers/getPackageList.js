
require("async");
const path = require("path");
const fs = require("fs");

async function getPackageList(readEncoding, _onlyLoosePackages){
    const route = './Packages' ;
    if(!fs.existsSync(path.resolve(route))){
        throw `Folder ${path.resolve(route)} does not exist.`;
    }
    let packages = await fs.readdirSync(path.resolve(route),{withFileTypes: true, encoding: readEncoding});
    packages = packages.filter(dir => _onlyLoosePackages ? dir.isFile() : !dir.isFile());
    packages = packages.map(dir => _onlyLoosePackages ? dir.name.split('.')[0] : dir.name);
    return packages;
}

module.exports = getPackageList;