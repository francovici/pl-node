const clean = require('../src/clean');
const fs = require('fs');
const path = require('path');
const {expect} = require('chai');
const exampleDirPath = './builded_example/Packages';
const testExampleDirPath = './Packages';

beforeEach('Rebuilding Packages dir for next test...',() => {
    fs.cpSync(exampleDirPath,testExampleDirPath, { recursive: true });
});

describe('pl --clean', () => {
    it('should clean all builded packages', (done) => {
        clean()
        .then(() => {
            const cust_sal_deployed_dir_exists = fs.existsSync(path.resolve(`${testExampleDirPath}/CUST_SAL/DEPLOY`));
            const emp_bonus_deployed_dir_exists = fs.existsSync(path.resolve(`${testExampleDirPath}/EMP_BONUS/DEPLOY`));
            expect((!cust_sal_deployed_dir_exists && !emp_bonus_deployed_dir_exists)).to.be.true;
            return done();
        })
        .catch((err) => {
            done(err);
        });
    })
});

describe('pl --clean <PACKAGE_NAME>', () => {
    it('should clean only CUST_SAL package', (done) => {
        clean('CUST_SAL')
        .then(() => {
            const cust_sal_deployed_dir_exists = fs.existsSync(path.resolve(`${testExampleDirPath}/CUST_SAL/DEPLOY`));
            const emp_bonus_deployed_dir_exists = fs.existsSync(path.resolve(`${testExampleDirPath}/EMP_BONUS/DEPLOY`));
            expect(!cust_sal_deployed_dir_exists && emp_bonus_deployed_dir_exists).to.be.true;
            return done();
        })
        .catch((err) => {
            done(err);
        });
    })
});

afterEach(() => {
    if(fs.existsSync(testExampleDirPath)){
        fs.rmSync(testExampleDirPath, { recursive: true });
    }
});