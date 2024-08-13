import logging
from bson import ObjectId

from core.databases.mongodb.base import BaseDb

from core.databases.mongodb.moderator.model import Moderator

class ArtistController():
    def __init__(self, db_ins):
        self.db = db_ins.db
        self.collection = self.db["artistrequests"]

    async def get_unapproved_artist_requests(self) -> bool:
        logging.info('request to db to get all unapproved artist requests')

        artist_requests = self.collection.find({"approved": False})

        populated_requests = []
        for request in await artist_requests.to_list(length=None):
            artist_id = request.get("artistId")
            if artist_id:
                user = await self.db["users"].find_one({"_id": ObjectId(artist_id)})
                if user:
                    request["artistDetails"] = user
            populated_requests.append(request)
        
        return populated_requests
