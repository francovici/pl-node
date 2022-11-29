const init = require('../src/init');
const fs = require('fs');
const path = require('path');
const {expect} = require('chai');
const outputDir = 'dist';
const testExampleDirPath = `./${outputDir}`;

/* beforeEach('Rebuilding Packages dir for next test...',() => {
    fs.cpSync(exampleDirPath,testExampleDirPath, { recursive: true });
});
 */
describe('pl --init', () => {
    it.only('should create a dist folder with all files', () => {
        init(outputDir);
        const packages_exists = fs.existsSync(path.resolve(`${testExampleDirPath}/Packages`));
        const src_exists = fs.existsSync(path.resolve(`${testExampleDirPath}/src`));
        const tests_exists = fs.existsSync(path.resolve(`${testExampleDirPath}/tests`));
        const env_exists = fs.existsSync(path.resolve(`${testExampleDirPath}/.env`));
        const gitignore_exists = fs.existsSync(path.resolve(`${testExampleDirPath}/.gitignore`));
        expect(packages_exists).to.be.true;        
        expect(src_exists).to.be.true;        
        expect(tests_exists).to.be.true;        
        expect(env_exists).to.be.true;        
        expect(gitignore_exists).to.be.true;       
    })
});

afterEach(() => {
    if(fs.existsSync(testExampleDirPath)){
        fs.rmSync(testExampleDirPath, { recursive: true });
    }
});