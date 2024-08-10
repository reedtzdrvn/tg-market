import logging

from aiogram import Router, F
from aiogram.filters import CommandStart, Command
from aiogram.types import Message
from aiogram.enums import ChatAction

from pymongo.errors import DuplicateKeyError

import core.keyboards.user_keyboard as kb

user_router = Router()


@user_router.message(CommandStart())
async def message_handler(message: Message, _user_controller) -> None:
    try:
        await message.bot.send_chat_action(chat_id=message.from_user.id, action=ChatAction.TYPING)
        await _user_controller.add_user(
            message.from_user.id, message.from_user.username
        )

        await message.answer(
            f"Здравствуйте, <b>{message.from_user.full_name}!</b>\n\n"
            "Вы успешно прошли первичную регистрацию в приложении <b>Events App!</b>\n\n"
            "Это приложение для быстрого поиска артистов для вашего события, а также для продажи своих услуг, если вы артист.\n\n"
            "Покупайте или продавайте впечатления, общайтесь с артистами или заказчиками.\n\n",
            reply_markup=kb.web_app_keyboard_inline,
        )
    except DuplicateKeyError as dke:
        logging.info(dke)
        await message.answer(
            "Здравствуйте. Вы уже зарегестрированы в приложении Events App!\n\nПереходите к WebApp.",
            reply_markup=kb.web_app_keyboard_inline,
        )
    except Exception as e:
        logging.info(e)
        await message.answer(
            "Здравствуйте. Произошла ошибка при попытке первичной регистрации.\n\nПопробуйте позже."
        )
