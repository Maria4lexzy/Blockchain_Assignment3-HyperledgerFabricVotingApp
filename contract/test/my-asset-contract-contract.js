/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { MyAssetContractContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logger = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('MyAssetContractContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new MyAssetContractContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"my asset contract 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"my asset contract 1002 value"}'));
    });

    describe('#myAssetContractExists', () => {

        it('should return true for a my asset contract', async () => {
            await contract.myAssetContractExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a my asset contract that does not exist', async () => {
            await contract.myAssetContractExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createMyAssetContract', () => {

        it('should create a my asset contract', async () => {
            await contract.createMyAssetContract(ctx, '1003', 'my asset contract 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"my asset contract 1003 value"}'));
        });

        it('should throw an error for a my asset contract that already exists', async () => {
            await contract.createMyAssetContract(ctx, '1001', 'myvalue').should.be.rejectedWith(/The my asset contract 1001 already exists/);
        });

    });

    describe('#readMyAssetContract', () => {

        it('should return a my asset contract', async () => {
            await contract.readMyAssetContract(ctx, '1001').should.eventually.deep.equal({ value: 'my asset contract 1001 value' });
        });

        it('should throw an error for a my asset contract that does not exist', async () => {
            await contract.readMyAssetContract(ctx, '1003').should.be.rejectedWith(/The my asset contract 1003 does not exist/);
        });

    });

    describe('#updateMyAssetContract', () => {

        it('should update a my asset contract', async () => {
            await contract.updateMyAssetContract(ctx, '1001', 'my asset contract 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"my asset contract 1001 new value"}'));
        });

        it('should throw an error for a my asset contract that does not exist', async () => {
            await contract.updateMyAssetContract(ctx, '1003', 'my asset contract 1003 new value').should.be.rejectedWith(/The my asset contract 1003 does not exist/);
        });

    });

    describe('#deleteMyAssetContract', () => {

        it('should delete a my asset contract', async () => {
            await contract.deleteMyAssetContract(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a my asset contract that does not exist', async () => {
            await contract.deleteMyAssetContract(ctx, '1003').should.be.rejectedWith(/The my asset contract 1003 does not exist/);
        });

    });

});
