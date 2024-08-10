import logging

from core.databases.mongodb.base import BaseDb

from core.databases.mongodb.moderator.model import Moderator

class ModeratorController():
    def __init__(self, db_ins):
        self.db = db_ins.db
        self.collection = self.db["moderators"]

    async def is_moderator(self, telegramId: int) -> bool:
        logging.info('request to db to find out if the user is a moderator')

        return bool(await self.collection.find_one({'telegramId': str(telegramId)}))
