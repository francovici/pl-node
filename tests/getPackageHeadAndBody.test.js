const fs = require('fs');
const {expect} = require('chai');
const { getPackageHead } = require('../src/helpers/getPackageHeadAndBody');
const exampleDirPath = './example/Packages';
const testExampleDirPath = './Packages';

beforeEach('Rebuilding Packages dir for next test...',() => {
    fs.cpSync(exampleDirPath,testExampleDirPath, { recursive: true });
});

describe(`getPackageHead('CUST_SAL')`, () => {
    const packageHead = getPackageHead('CUST_SAL');

    it('should contain head definition', () => {
        expect(packageHead).to.contain('CREATE OR REPLACE PACKAGE cust_sal AS');
    })

    it('should contain END statement at the very end', () => {
        expect(packageHead.endsWith('END cust_sal;',20)).to.be.true;
    })
});


after(() => {
    fs.rmSync(testExampleDirPath, { recursive: true });
});