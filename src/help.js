var clc = require("cli-color");
module.exports = () => {
    console.log('');
    console.log(clc.bgBlue(' --- PL/SQL CLI Tool ---'));
    console.log('');
    console.log('Tool for working with PL/SQL Packages');
    console.log('Available commands:');
    console.log('');

    console.log('Command\t\tAction\t\t\t\t\tArguments');

    console.log('pl --init\tInit project structure\t\t\t');
    console.log('pl --clean\tCleans builded packages\t\t\t--package');
    console.log('pl --build\tBuilds package from source files\t--package');
    console.log('pl --compile\tCompiles existing packages on Oracle\t--package');
    console.log('pl --help\tShows this help information\t\t\t');
    console.log('pl --version\tShows version information\t\t\t');

}