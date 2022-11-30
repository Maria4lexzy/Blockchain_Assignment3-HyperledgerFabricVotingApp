/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { VoterContract } = require('..');
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

describe('VoterContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new VoterContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"voter 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"voter 1002 value"}'));
    });

    describe('#voterExists', () => {

        it('should return true for a voter', async () => {
            await contract.voterExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a voter that does not exist', async () => {
            await contract.voterExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createVoter', () => {

        it('should create a voter', async () => {
            await contract.createVoter(ctx, '1003', 'voter 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"voter 1003 value"}'));
        });

        it('should throw an error for a voter that already exists', async () => {
            await contract.createVoter(ctx, '1001', 'myvalue').should.be.rejectedWith(/The voter 1001 already exists/);
        });

    });

    describe('#readVoter', () => {

        it('should return a voter', async () => {
            await contract.readVoter(ctx, '1001').should.eventually.deep.equal({ value: 'voter 1001 value' });
        });

        it('should throw an error for a voter that does not exist', async () => {
            await contract.readVoter(ctx, '1003').should.be.rejectedWith(/The voter 1003 does not exist/);
        });

    });

    describe('#updateVoter', () => {

        it('should update a voter', async () => {
            await contract.updateVoter(ctx, '1001', 'voter 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"voter 1001 new value"}'));
        });

        it('should throw an error for a voter that does not exist', async () => {
            await contract.updateVoter(ctx, '1003', 'voter 1003 new value').should.be.rejectedWith(/The voter 1003 does not exist/);
        });

    });

    describe('#deleteVoter', () => {

        it('should delete a voter', async () => {
            await contract.deleteVoter(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a voter that does not exist', async () => {
            await contract.deleteVoter(ctx, '1003').should.be.rejectedWith(/The voter 1003 does not exist/);
        });

    });

});
