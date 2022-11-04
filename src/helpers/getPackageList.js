
require("async");
const path = require("path");
const fs = require("fs");

async function getPackageList(){
    const route = './Packages' ;
    let packages = await fs.readdirSync(path.resolve(route),{withFileTypes: true, encoding: 'utf-8'});
    packages = packages.filter(dir => !dir.isFile());
    packages = packages.map(dir => dir.name);
    return packages;
}

module.exports = getPackageList;