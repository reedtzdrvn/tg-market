from aiogram import Router, F
from aiogram.filters import Command
from aiogram.types import Message
from aiogram.enums import ChatAction

from core.filters.Admin import AdminFilter
from core.keyboards.admin_keyboard import main_keyboard
import pprint

from core.databases.mongodb.artist.controller import ArtistController

admin_router = Router()


@admin_router.message(Command("admin"), AdminFilter())
async def welcome_message(message: Message) -> None:
    await message.bot.send_chat_action(
        chat_id=message.from_user.id, action=ChatAction.TYPING
    )
    await message.answer(
        "Здравствуйте. Вы зашли, как <b>Администратор</b>", reply_markup=main_keyboard
    )

@admin_router.message(F.text == 'Исполнители', AdminFilter())
async def artist_message(message: Message, _artist_controller: ArtistController) -> None:
    await message.bot.send_chat_action(
        chat_id=message.from_user.id, action=ChatAction.TYPING
    )

    data = await _artist_controller.get_unapproved_artist_requests()
    
    pprint.pp(data)
    await message.bot.send_chat_action(
        chat_id=message.from_user.id, action=ChatAction.TYPING
    )
    await message.answer(
        "Исполнители", reply_markup=main_keyboard
    )

@admin_router.message(F.text == 'Отзывы', AdminFilter())
async def review_message(message: Message) -> None:
    await message.bot.send_chat_action(
        chat_id=message.from_user.id, action=ChatAction.TYPING
    )
    await message.answer(
        "Отзывы", reply_markup=main_keyboard
    )

@admin_router.message(F.text == 'Заказы', AdminFilter())
async def orders_message(message: Message) -> None:
    await message.bot.send_chat_action(
        chat_id=message.from_user.id, action=ChatAction.TYPING
    )
    await message.answer(
        "Заказы", reply_markup=main_keyboard
    )

@admin_router.message()
async def unknown_command(message: Message) -> None:
    await message.answer("Неизвестная команда")
