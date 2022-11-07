var path = require('path');
const fs = require('fs');

function getPackageHead(packageName) {
    return fs.readFileSync(path.resolve(`./Packages/${packageName}/${packageName}.sql`)).toString();
}

function getPackageBody(packageName) {
    return fs.readFileSync(path.resolve(`./Packages/${packageName}/${packageName}_BODY.sql`)).toString();
}

module.exports = {getPackageHead,getPackageBody};