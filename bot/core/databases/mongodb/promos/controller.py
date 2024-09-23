import logging

from core.databases.mongodb.base import BaseDb

from core.databases.mongodb.user.model import User


class PromosController():
    def __init__(self, db_ins):
        self.db = db_ins.db
        self.collection = self.db["promos"]

    async def add_promo(self, promo_name, count, tarifs, discount_value, discount_type) -> bool:
        if discount_type == "Процент":
            await self.collection.insert_one({'promo': promo_name, 'count': count, 'tarifs': tarifs, 'percentPrice': discount_value})
        else:
            await self.collection.insert_one({'promo': promo_name, 'count': count, 'tarifs': tarifs, 'fixPrice': discount_value})
        
        logging.info(f"Promo {promo_name} added successfully!")
