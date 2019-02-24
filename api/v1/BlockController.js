const SHA256 = require('crypto-js/sha256');
const Block = require('../../blockchain/Block');
const BlockChain = require('../../blockchain/BlockChain');
const helper = require('../v1/helper');

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {
	/**
	 * Constructor to create a new BlockController, you need to initialize here all your endpoints
	 * @param {*} app
	 */
	constructor(app) {
		// TODO try to find a way to use router with this class.
		this.urlPrefix = '/api/v1';
		this.myBlockChain = new BlockChain.Blockchain();

		this.app = app;
		this.initializeMockData();
		this.getBlockByIndex();
		this.postNewBlock();
	}

	/**
	 * Implement a GET Endpoint to retrieve a block by index, url: "/api/v1/block/:index"
	 */
	getBlockByIndex() {
		this.app.get(`${this.urlPrefix}/block/:id`, async (req, res) => {
			let blockId = req.params.id;

			// validate if block id is numeric
			if (helper.isNumeric(blockId)) {
				// parse block id string to integer
				blockId = parseInt(blockId);

				// get block data
				const block = await this.myBlockChain.getBlock(blockId);
				console.log(block, blockId);

				if (block) {
					res.json(block);
				} else {
					res.sendStatus(404);
				}
			} else {
				res.sendStatus(400);
			}
		});
	}

	/**
	 * Implement a POST Endpoint to add a new Block, url: "/api/v1/block"
	 */
	postNewBlock() {
		this.app.post(`${this.urlPrefix}/block`, async (req, res) => {
			const { data } = req.body;

			if (data) {
				try {
					// add new block to blockchain
					let block = new Block.Block(data);
					await this.myBlockChain.addBlock(block);

					res.sendStatus(201);
				} catch (e) {
					res.sendStatus(500);
				}
			} else {
				res.sendStatus(400);
			}
		});
	}

	/**
	 * Help method to initialized Mock dataset, adds 10 test blocks to the blocks array
	 */
	async initializeMockData() {
		const blockHeight = await this.myBlockChain.getBlockHeight();
		if (blockHeight === 0) {
			await this.myBlockChain.generateGenesisBlock();
			for (let index = 1; index < 10; index++) {
				let blockTest = new Block.Block('Test Block - ' + (index));
				await this.myBlockChain.addBlock(blockTest).then((result) => {
					console.log('The Loop', result);
				});
			}
		}
	}

}

/**
 * Exporting the BlockController class
 * @param {*} app
 */
module.exports = (app) => {
	return new BlockController(app);
};
