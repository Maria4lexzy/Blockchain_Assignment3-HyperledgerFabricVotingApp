/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class MyAssetContractContract extends Contract {

    async myAssetContractExists(ctx, myAssetContractId) {
        const buffer = await ctx.stub.getState(myAssetContractId);
        return (!!buffer && buffer.length > 0);
    }

    async createMyAssetContract(ctx, myAssetContractId, value) {
        const exists = await this.myAssetContractExists(ctx, myAssetContractId);
        if (exists) {
            throw new Error(`The my asset contract ${myAssetContractId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(myAssetContractId, buffer);
    }

    async readMyAssetContract(ctx, myAssetContractId) {
        const exists = await this.myAssetContractExists(ctx, myAssetContractId);
        if (!exists) {
            throw new Error(`The my asset contract ${myAssetContractId} does not exist`);
        }
        const buffer = await ctx.stub.getState(myAssetContractId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateMyAssetContract(ctx, myAssetContractId, newValue) {
        const exists = await this.myAssetContractExists(ctx, myAssetContractId);
        if (!exists) {
            throw new Error(`The my asset contract ${myAssetContractId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(myAssetContractId, buffer);
    }

    async deleteMyAssetContract(ctx, myAssetContractId) {
        const exists = await this.myAssetContractExists(ctx, myAssetContractId);
        if (!exists) {
            throw new Error(`The my asset contract ${myAssetContractId} does not exist`);
        }
        await ctx.stub.deleteState(myAssetContractId);
    }

}

module.exports = MyAssetContractContract;
