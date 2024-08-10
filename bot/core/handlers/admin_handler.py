from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message
from aiogram.enums import ChatAction

from core.filters.Admin import AdminFilter
from core.keyboards.admin_keyboard import main_keyboard

admin_router = Router()


@admin_router.message(Command("admin"), AdminFilter())
async def welcome_message(message: Message) -> None:
    await message.bot.send_chat_action(
        chat_id=message.from_user.id, action=ChatAction.TYPING
    )
    await message.answer(
        "Здравствуйте. Вы зашли, как <b>Администратор</b>", reply_markup=main_keyboard
    )


@admin_router.message()
async def unknown_command(message: Message) -> None:
    await message.answer("Неизвестная команда")
