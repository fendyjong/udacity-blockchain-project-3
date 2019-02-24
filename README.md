# Project #3. Private Blockchain API

This is Project 3, Private Blockchain. This the follow up from Project 2 (Private Blockchain), in this project I created
 API to access my private blockchain.

## Setup project for Review.

To setup the project for review do the following:
1. Download the project.
2. Run command __npm install__ to install the project dependencies.
3. Run command __npm start__ in the root directory.

## Testing the project

You may use [Postman](https://www.getpostman.com/) or curl to test the project

## Request and response examples

#### API Resources
The following API request and response is in JSON format
- GET /api/v1/block/[id] 
- POST /api/v1/block

#### GET `/api/v1/block/[id]`

Get block in the blockchain using block id

Response

- Successful response:
	```
	{
			"height": 1,
			"timeStamp": "1551025926",
			"data": "Test Block - 1",
			"previousHash": "8e55a2effb0335136766f4dff43dc1c2b56aeb7fd58f7d65e3e94547389659e0",
			"hash": "05bf1ad9b465bd0c79ff62e5f7d2fc209896e76fbbd24b4b9f9153ec5bba4956"
	}
	```
- 404 Not Found: Block is not found


#### POST `/api/v1/block`

Post new block into the blockchain

Request
```
{
    "data": "New block data can be string or object",
}
```

Response
- 200 Created: Block has been successfully created
- 400 Bad Request: JSON request is invalid
- 500 Internal Server Error
