from flask import Flask, request
import json
import time
from hashlib import sha256
from ecdsa import BadSignatureError
from ecdsa.util import sigdecode_der

app = Flask(__name__)


# Define a 'Block class' to represent each block in the blockchain
class Block:
    def __init__(self, index, transactions, timestamp, previous_hash, nonce=0):
        self.index = index
        self.transactions = transactions
        self.timestamp = timestamp
        self.previous_hash = previous_hash
        self.nonce = nonce
        self.hash = self.compute_hash()

    # Compute the hash of the block by hashing the block's contents
    def compute_hash(self):
        block_string = json.dumps(self.__dict__, sort_keys=True)
        return sha256(block_string.encode()).hexdigest()


# Define a 'Blockchain class' to manage the chain of blocks
class Blockchain:
    difficulty = 3  # Difficulty level for the proof-of-work algorithm

    def __init__(self):
        # Transactions that are not yet included in any block
        self.unconfirmed_transactions = []
        self.chain = []
        self.create_genesis_block()

    # Create the first block in the blockchain
    def create_genesis_block(self):
        genesis_block = Block(0, [], time.time(), "0")
        genesis_block.hash = genesis_block.compute_hash()
        self.chain.append(genesis_block)

    # Get the last block in the chain

    @property
    def last_block(self):
        return self.chain[-1]

    # Proof-of-work algorithm to mine a new block
    def proof_of_work(self, block):
        block.nonce = 0
        computed_hash = block.compute_hash()
        while not computed_hash.startswith('0' * Blockchain.difficulty):
            block.nonce += 1
            computed_hash = block.compute_hash()
        return computed_hash

    # Add a new block to the chain after validation
    def add_block(self, block, proof):
        previous_hash = self.last_block.hash
        if previous_hash != block.previous_hash:
            return False
        if not self.is_valid_proof(block, proof):
            return False
        block.hash = proof
        self.chain.append(block)
        print(
            f"Block #{block.index} has been added to the blockchain with hash: {block.hash}")
        return True

    # Check if a block's hash is valid
    def is_valid_proof(self, block, block_hash):
        return (block_hash.startswith('0' * Blockchain.difficulty) and
                block_hash == block.compute_hash())

    # Add a new transaction to the list of unconfirmed transactions
    def add_new_transaction(self, transaction):
        self.unconfirmed_transactions.append(transaction)

    # Mine the unconfirmed transactions in a new block
    def mine(self):
        if not self.unconfirmed_transactions:
            return False
        last_block = self.last_block
        new_block = Block(index=last_block.index + 1,
                          transactions=self.unconfirmed_transactions,
                          timestamp=time.time(),
                          previous_hash=last_block.hash)
        proof = self.proof_of_work(new_block)
        self.add_block(new_block, proof)
        self.unconfirmed_transactions = []
        return new_block.index


blockchain = Blockchain()


# Endpoint to create new transactions
@app.route('/transactions', methods=['POST'])
def new_transactions():
    txs_data = request.get_json()
    required_fields = ["firstname", "lastname", "cnp", "dob"]

    for tx_data in txs_data:
        # Validate that each transaction has the required fields
        for field in required_fields:
            if not tx_data.get(field):
                return "Invalid transaction data", 404
        # Add a timestamp to the transaction
        tx_data["timestamp"] = time.time()
        # Add the transaction to the blockchain
        blockchain.add_new_transaction(tx_data)

    return "Success", 201


# Endpoint to retrieve the full blockchain
@app.route('/chain', methods=['GET'])
def get_chain():
    chain_data = []
    for block in blockchain.chain:
        chain_data.append(block.__dict__)
    return json.dumps({"length": len(chain_data), "chain": chain_data})


# Endpoint to mine unconfirmed transactions and add them to the blockchain
@app.route('/mine', methods=['GET'])
def mine_unconfirmed_transactions():
    result = blockchain.mine()
    if not result:
        return "No transactions to mine"
    return f"Block #{result} is mined."


if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0')
