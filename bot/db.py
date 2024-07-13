import logging

from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError

class Db:
    def __init__(self, db_url, db_name) -> None:
        self.client = MongoClient(db_url)
        self.db = self.client['test']

        try:
            self.db.command('ping')
            logging.info('Connected to MongoDB!')
        except Exception as e:
            print(e)

    def add_user(self, telegramId: int, phoneNumber: str, username: str) -> bool:
        user_collection = self.db['users']
        new_user = {
            'telegramId': telegramId,
            'phoneNumber': phoneNumber,
            'username': username
        }
        try:
            user_collection.insert_one(new_user)
            logging.info(f"User {username} added successfully!")
            return True
        except DuplicateKeyError as e:
            logging.error(f"Duplicate key error: {e.details}")
            return False
        except Exception as e:
            logging.error(f"An error occurred while adding the user: {e}")
            return False
    
    def get_all_users(self):
        user_collection = self.db['users']

        try:
            all_users = list(user_collection.find({}))
            logging.info(f"Loaded all users")
            return all_users
        except Exception as e:
                logging.error(f"An error occurred while adding the user: {e}")

    