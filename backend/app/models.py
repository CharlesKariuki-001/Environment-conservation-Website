from werkzeug.security import generate_password_hash, check_password_hash
from .database import get_db  # Assuming you have a get_db() function to get the MongoDB connection

class User:
    def __init__(self, username, password, is_admin=False, email=None, address=None):
        self.username = username
        self.password = password
        self.is_admin = is_admin
        self.email = email
        self.address = address

    def hash_password(self):
        """Hashes the user's password before saving"""
        self.password = generate_password_hash(self.password, method='pbkdf2:sha256')

    def check_password(self, password):
        """Compares the password with the hashed one in the database"""
        return check_password_hash(self.password, password)

    def to_dict(self):
        """Converts the user object to a dictionary for easy insertion into MongoDB"""
        return {
            "username": self.username,
            "password": self.password,
            "is_admin": self.is_admin,
            "email": self.email,
            "address": self.address
        }

    @staticmethod
    def find_by_username(username):
        """Find a user by username"""
        db = get_db()  # Access the MongoDB instance
        return db.users.find_one({"username": username})  # Query the 'users' collection

    @staticmethod
    def create_user(data):
        """Create and insert a new user into the database"""
        user = User(data['username'], data['password'], data.get('is_admin', False), data['email'], data['address'])
        user.hash_password()  # Ensure the password is hashed
        db = get_db()
        db.users.insert_one(user.to_dict())  # Insert the new user into the 'users' collection
        return user
