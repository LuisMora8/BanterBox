import hashlib
import string
import secrets

password = "password1"
# Generate a random salt
alphabet = string.ascii_letters + string.digits
salt = ''.join(secrets.choice(alphabet) for i in range(16))
print(salt)
# Concatenate the salt and password
salted_password = salt + password
print(salted_password)
# Hash the encoded salted password using SHA-256
hashed_password = hashlib.sha256(salted_password.encode('utf-8')).hexdigest()
hashed_password = "$"+salt +"$"+ hashed_password
print(hashed_password)