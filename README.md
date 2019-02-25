# Project #3. Private Blockchain API

This is Project 3, Private Blockchain. This the follow up from Project 2 (Private Blockchain), in this project I created
 API to access my private blockchain.
 
## Technology used.

- [NodeJS](https://nodejs.org/en/)
- [Level DB](https://github.com/Level/level)
- [Express](https://expressjs.com/)

## Setup project for Review.

To setup the project for review do the following:
1. Download the project.
2. Run command __npm install__ to install the project dependencies.
3. Run command __npm start__ in the root directory.

## Testing the project

You may use [Postman](https://www.getpostman.com/) or curl to test the project

## Request and response examples

### API Resources
The following API request and response is in JSON format
- GET /block/[id]
- POST /block

### GET `/block/[id]` 

Get block in the blockchain using block id

##### Response

- 200 OK:
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


#### POST `/block`

Post new block into the blockchain

##### Request
```
{
  "data": "New block data can be string or object",
}
```

##### Response
- 201 Created:
	```
	{
	  "height": 1,
	  "timeStamp": "1551025926",
	  "data": "Test Block - 1",
	  "previousHash": "8e55a2effb0335136766f4dff43dc1c2b56aeb7fd58f7d65e3e94547389659e0",
	  "hash": "05bf1ad9b465bd0c79ff62e5f7d2fc209896e76fbbd24b4b9f9153ec5bba4956"
	}
	```
- 400 Bad Request: JSON request is invalid
- 500 Internal Server Error
