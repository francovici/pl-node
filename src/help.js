var clc = require("cli-color");
module.exports = () => {
    console.log('');
    console.log(clc.bgBlue(' --- PL/SQL CLI Tool ---'));
    console.log('');
    console.log('Tool for working with PL/SQL Packages');
    console.log('Available commands:');
    console.log('');

    console.log('Command\t\tAction\t\t\t\t\tArguments');

    console.log('pl --init\tInit project structure\t\t\tsubDirectory');
    console.log('pl --split\tSplit packages into spec and body\tpackageName');
    console.log('pl --clean\tCleans builded packages\t\t\tpackageName');
    console.log('pl --build\tBuilds package from source files\tpackageName');
    console.log('pl --compile\tCompiles existing packages on Oracle\tpackageName');
    console.log('pl --help\tShows this help information\t\t\t');
    console.log('pl --version\tShows version information\t\t\t');

    console.log('');
    console.log('Usage Examples:');
    console.log('');
    console.log('pl --init ' + clc.blue('outDir'));
    console.log('Starts project structure within an "outDir" folder inside the current directory');
    
    console.log('');
    console.log('pl --build ' + clc.blue('MY_PACKAGE'));
    console.log('Looks for the source code inside ./Packages/"MY_PACKAGE" directory and builds the package.');

    console.log('');
    console.log('pl --split');
    console.log('Looks for new packages in ./Packages directory and splits it into spec and body inside a subDirectory.');

}