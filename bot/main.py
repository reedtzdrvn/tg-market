import asyncio
import logging
import sys

from aiogram import Bot, Dispatcher, html
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode

from core.handlers.user_handler import user_router

from core.databases.mongodb.base import BaseDb
from core.databases.mongodb.user.UserDb import UserController

from config import BOT_TOKEN, DB_CONNECTION_STRING


async def main() -> None:
    dp = Dispatcher()

    base_db = BaseDb(db_url=DB_CONNECTION_STRING)

    try:
        await base_db.initialize()
    except Exception as e:
        print(f"Failed to initialize database: {e}")
        return

    # CONTROLLERS
    user_controller = UserController(base_db)

    bot = Bot(token=BOT_TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))

    dp.include_router(user_router)

    await dp.start_polling(bot, _user_controller=user_controller)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)

    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Exited")
    except Exception as e:
        print(e)
