# https://www.activestate.com/blog/how-to-build-a-blockchain-in-python/

# Build a Blockchain in Python: Summary
# In this tutorial, we used Python to create an ongoing chain of hash-based proof-of-work.

# Then, we built a proof-of-work system and a way to add new blocks through mining.
# Finally, we created an application with Flask and queried it.

# python3 blochain.py
# First, we established the concept of a block and a blockchain, including protocols for hashing each block and creating the first block.
# http://0.0.0.0:5000/chain
# http://0.0.0.0:5000/mine
# http://0.0.0.0:5000/transactions


from secrets import token_hex, token_urlsafe
import random
import time
from hashlib import sha256
import json
from flask import Flask, request
import requests

app = Flask(__name__)


# class PasswordGenerator:
#     def __init__(self):
#         pass

#     @staticmethod
#     def shuffle_string(s):
#         """Shuffle all characters of a string."""
#         shuffled_list = random.sample(s, len(s))
#         return ''.join(shuffled_list)

#     @staticmethod
#     def generate_random_character(start_ascii, end_ascii):
#         """Generate a random character based on ASCII values."""
#         return chr(random.randint(start_ascii, end_ascii))

#     def generate_password(self):
#         """Generate a random password."""
#         # ASCII ranges for different character categories
#         uppercase_ascii = (65, 90)
#         lowercase_ascii = (97, 122)
#         digit_ascii = (48, 57)
#         special_ascii = (33, 93)

#         # Generate two characters from each category
#         uppercase_chars = [self.generate_random_character(
#             *uppercase_ascii) for _ in range(5)]
#         lowercase_chars = [self.generate_random_character(
#             *lowercase_ascii) for _ in range(4)]
#         digits = [self.generate_random_character(
#             *digit_ascii) for _ in range(2)]
#         specials = [self.generate_random_character(
#             *special_ascii) for _ in range(3)]

#         # Construct the password and shuffle it
#         password = ''.join(uppercase_chars +
#                            lowercase_chars + digits + specials)
#         return self.shuffle_string(password)


# 1. Define a single block
class Block:
    def __init__(self, index, transactions, timestamp, previous_hash, nonce=0):
        self.index = index
        self.transactions = transactions
        self.timestamp = timestamp
        self.previous_hash = previous_hash
        self.nonce = nonce
        self.hash = self.compute_hash()

    def compute_hash(self):
        block_string = json.dumps(self.__dict__, sort_keys=True)
        return sha256(block_string.encode()).hexdigest()


# 2. Define a blockchain
class Blockchain:
    difficulty = 4

    def __init__(self):
        self.unconfirmed_transactions = []
        self.chain = []
        self.create_genesis_block()

    def create_genesis_block(self):
        genesis_block = Block(0, [], time.time(), "0")
        genesis_block.hash = genesis_block.compute_hash()
        self.chain.append(genesis_block)

    @property
    def last_block(self):
        return self.chain[-1]

    difficulty = 2

    # 3. Define a proof-of-work system
    def proof_of_work(self, block):
        block.nonce = 0

        computed_hash = block.compute_hash()

        while not computed_hash.startswith('0' * Blockchain.difficulty):
            block.nonce += 1
            computed_hash = block.compute_hash()

        return computed_hash

    # 4. Define a mining procedure
    def add_block(self, block, proof):
        previous_hash = self.last_block.hash

        if previous_hash != block.previous_hash:
            return False

        if not self.is_valid_proof(block, proof):
            return False

        block.hash = proof
        self.chain.append(block)
        return True

    def is_valid_proof(self, block, block_hash):
        return (block_hash.startswith('0' * Blockchain.difficulty) and
                block_hash == block.compute_hash())

    def add_new_transaction(self, transaction):
        self.unconfirmed_transactions.append(transaction)

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


@app.route('/transactions', methods=['POST'])
def new_transactions():
    txs_data = request.get_json()
    for tx_data in txs_data:
        required_fields = ["firstname", "lastname", "cnp", "dob"]

        # generate random password text in base64
        password = token_urlsafe(16)

        for field in required_fields:
            if not tx_data.get(field):
                return "Invalid transaction data", 404

        tx_data["password"] = password
        tx_data["timestamp"] = time.time()

        blockchain.add_new_transaction(tx_data)

    return "Success", 201


@app.route('/chain', methods=['GET'])
def get_chain():
    chain_data = []
    for block in blockchain.chain:
        chain_data.append(block.__dict__)
    return json.dumps({"length": len(chain_data),
                       "chain": chain_data})


@app.route('/mine', methods=['GET'])
def mine_unconfirmed_transactions():
    result = blockchain.mine()
    if not result:
        return "No transactions to mine"
    return f"Block #{result} is mined."


app.run(debug=True, port=5001, host='0.0.0.0')
