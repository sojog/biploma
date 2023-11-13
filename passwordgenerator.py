import random
import string

def generate_strong_password(length):
    #combining alphabets(upper and lower), number and special characters
    characters = string.ascii_letters + string.digits + string.punctuation

    #randomly selecting k numbers of characters
    password = ''.join(random.choices(characters, k=length))

    return password

password = generate_strong_password(12)

print(password)
