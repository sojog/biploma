import requests

# Create transaction
transaction_data = {
    "firstname": "Pamela",
    "lastname": "Barbulescu",
    "dob": "10-dec-2013",
    "cnp": "19343084984059"
}

# Send the transaction to the Flask app
response = requests.post(
    'http://localhost:5001/transactions', json=[transaction_data])
print(response.text)
