/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

const SHA256 = require('crypto-js/sha256');
const LevelSandbox = require('./LevelSandbox');
const Block = require('./Block');

class Blockchain {
	constructor() {
		this.bd = new LevelSandbox.LevelSandbox();
	}

	// Helper method to create a Genesis Block (always with height= 0)
	// You have to options, because the method will always execute when you create your blockchain
	// you will need to set this up statically or instead you can verify if the height !== 0 then you
	// will not create the genesis block
	async generateGenesisBlock() {
		// get height from db
		const genesisBlock = new Block.Block('Genesis block');
		const height = await this.getBlockHeight();
		if (height === 0) {
			await this.addBlock(genesisBlock);
		}
	}

	// Get block height, it is a helper method that return the height of the blockchain
	async getBlockHeight() {
		return await this.bd.getBlocksCount();
	}

	// Add new block
	async addBlock(block) {
		// block height
		block.height = await this.getBlockHeight();

		// UTC timestamp
		block.timeStamp = new Date().getTime().toString().slice(0, -3);
		if (block.height > 0) {
			// previous block hash
			const previousBlock = await this.getBlock(block.height - 1);
			block.previousHash = previousBlock.hash;
		}
		// SHA256 requires a string of data
		block.hash = SHA256(JSON.stringify(block)).toString();

		return await this.bd.addLevelDBData(block.height, JSON.stringify(block));
	}

	// Get Block By Height
	async getBlock(height) {
		try {
			return JSON.parse(await this.bd.getLevelDBData(height));
		} catch (e) {
			return undefined;
		}
	}

	// Validate if Block is being tampered by Block Height
	async validateBlock(height) {
		// block is valid if the block hash is the same as SHA256 of that block
		const currentBlock = await this.getBlock(height);
		const nextBlock = await this.getBlock(height + 1);

		const block = JSON.parse(JSON.stringify(currentBlock));
		block.hash = '';

		const blockHash = SHA256(JSON.stringify(block)).toString();

		return blockHash === nextBlock.previousHash && currentBlock.hash === blockHash;
	}

	// Validate Blockchain
	async validateChain() {
		// Loop through all blocks in the chain
		const lastHeight = await this.getBlockHeight();
		const promises = [];
		const errorLog = [];
		for (let i = 1; i < lastHeight - 1; i++) {
			promises.push(this.validateBlock(i).then(valid => {
				if (!valid) {
					errorLog.push({
						height: i,
						error: 'Invalid block!',
					});
				}
			}));
		}

		return await Promise.all(promises).then(() => errorLog);
	}
}

module.exports.Blockchain = Blockchain;
