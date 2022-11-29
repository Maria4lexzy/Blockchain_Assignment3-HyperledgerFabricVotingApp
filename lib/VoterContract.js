/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class VoterContract extends Contract {

    async voterExists(ctx, voterId) {
        const buffer = await ctx.stub.getState(voterId);
        return (!!buffer && buffer.length > 0);
    }

    async createVoter(ctx, voterId, value) {
        const exists = await this.voterExists(ctx, voterId);
        if (exists) {
            throw new Error(`The voter ${voterId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(voterId, buffer);
    }

    async readVoter(ctx, voterId) {
        const exists = await this.voterExists(ctx, voterId);
        if (!exists) {
            throw new Error(`The voter ${voterId} does not exist`);
        }
        const buffer = await ctx.stub.getState(voterId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateVoter(ctx, voterId, newValue) {
        const exists = await this.voterExists(ctx, voterId);
        if (!exists) {
            throw new Error(`The voter ${voterId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(voterId, buffer);
    }

    async deleteVoter(ctx, voterId) {
        const exists = await this.voterExists(ctx, voterId);
        if (!exists) {
            throw new Error(`The voter ${voterId} does not exist`);
        }
        await ctx.stub.deleteState(voterId);
    }

}

module.exports = VoterContract;
