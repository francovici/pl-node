const fs = require('fs');
const {expect} = require('chai');
const { getPackageHead, getPackageBody } = require('../src/helpers/getPackageHeadAndBody');
const exampleDirPath = './example/Packages';
const testExampleDirPath = './Packages';

beforeEach('Rebuilding Packages dir for next test...',() => {
    fs.cpSync(exampleDirPath,testExampleDirPath, { recursive: true });
});

describe(`getPackageHead('CUST_SAL')`, () => {

    it('should contain head definition', () => {
        const packageHead = getPackageHead('CUST_SAL');
        expect(packageHead.startsWith('CREATE OR REPLACE PACKAGE cust_sal AS')).to.be.true;
    })

    it('should contain END statement at the very end', () => {
        const packageHead = getPackageHead('CUST_SAL').trimEnd().replace('\\n','').replace('\\t','').replace('\\r','').replace('\/','');
        expect(packageHead.endsWith('END cust_sal;')).to.be.true;
    })
});


describe(`getPackageBody('CUST_SAL')`, () => {

    it('should contain body definition', () => {
        const packageBody = getPackageBody('CUST_SAL');
        expect(packageBody.startsWith('CREATE OR REPLACE PACKAGE BODY cust_sal AS')).to.be.true;
    })

    it('should contain END statement at the very end', () => {
        const packageBody = getPackageBody('CUST_SAL').trimEnd().replace('\\n','').replace('\\t','').replace('\\r','').replace('\/','');
        expect(packageBody.endsWith('END cust_sal;')).to.be.true;
    })
});

afterEach(() => {
    if(fs.existsSync(testExampleDirPath)){
        fs.rmSync(testExampleDirPath, { recursive: true });
    }
});