
//Returns the list of files that should be included in the build of the package
module.exports = function filterIncludedFiles(packageName, fileList) {

    let includedFileNames = [
        `${packageName}.sql`,
        `${packageName}_BODY.sql`
    ];

    return fileList.filter(file => includedFileNames.includes(file.name));
}