from aiogram import Router, F, Bot
from aiogram.filters import Command
from aiogram.types import Message, InputMediaPhoto, InlineKeyboardMarkup, InlineKeyboardButton, CallbackQuery
from aiogram.enums import ChatAction
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from bson import ObjectId

from core.filters.Admin import AdminFilter
from core.keyboards.admin_keyboard import main_keyboard, build_artist_request_keyboard
from core.captions.artist_request_caption import generate_caption

from core.databases.mongodb.artist.controller import ArtistController

from config import BACKEND_URL

admin_router = Router()

class PaginationStates(StatesGroup):
    page = State()
    message_id = State()


@admin_router.message(Command("admin"), AdminFilter())
async def welcome_message(message: Message) -> None:
    await message.bot.send_chat_action(
        chat_id=message.from_user.id, action=ChatAction.TYPING
    )
    await message.answer(
        "Здравствуйте. Вы зашли, как <b>Администратор</b>", reply_markup=main_keyboard
    )


@admin_router.message(F.text == "Исполнители", AdminFilter())
async def artist_message(
    message: Message, _artist_controller: ArtistController, page: int = 0
) -> None:
    await message.bot.send_chat_action(
        chat_id=message.from_user.id, action=ChatAction.TYPING
    )

    data = await _artist_controller.get_unapproved_artist_requests()
    
    items_per_page = 1
    total_pages = (len(data) + items_per_page - 1) // items_per_page
    
    start = page * items_per_page
    end = start + items_per_page
    page_data = data[start:end]

    for person in page_data:
        caption = generate_caption(person)

        media = [
            InputMediaPhoto(
                media=f"{BACKEND_URL}{person.get('mainPhoto')}", caption=caption
            ),
            InputMediaPhoto(media=f"{BACKEND_URL}{person.get('backGroundPhoto')}"),
        ]

        for photo in person.get("photo"):
            media.append(InputMediaPhoto(media=f"{BACKEND_URL}{photo}"))

        await message.answer_media_group(media=media)

        keyboard = build_artist_request_keyboard(page, total_pages, person.get('_id'), person.get('artistDetails')['telegramId'])
    
        await message.answer("Страница {}/{}".format(page + 1, total_pages), reply_markup=keyboard)

@admin_router.callback_query(F.data.startswith("artists_page_"), AdminFilter())
async def paginate_artists(callback_query: CallbackQuery, _artist_controller: ArtistController) -> None:
    page = int(callback_query.data.split("_")[-1])

    await artist_message(callback_query.message, _artist_controller, page)

    await callback_query.answer()

@admin_router.callback_query(F.data.startswith("accept_artist_"), AdminFilter())
async def accept_artist(callback_query: CallbackQuery, _artist_controller: ArtistController, bot: Bot) -> None:
    telegram_id = int(callback_query.data.split("_")[-1])
    request_id = ObjectId(callback_query.data.split("_")[-2])

    await _artist_controller.accept_artist_request(request_id)

    await bot.send_message(chat_id=telegram_id, text="Ваша заявка принята.")

    await callback_query.answer("Исполнитель принят!")

    await artist_message(callback_query.message, _artist_controller, 0)

@admin_router.callback_query(F.data.startswith("reject_artist_"), AdminFilter())
async def reject_artist(callback_query: CallbackQuery, _artist_controller: ArtistController, bot: Bot) -> None:
    telegram_id = int(callback_query.data.split("_")[-1])
    request_id = ObjectId(callback_query.data.split("_")[-2])

    await bot.send_message(chat_id=telegram_id, text="Ваша заявка отклонена.\n Свяжитесь с тех.поддержкой.")

    await callback_query.answer("Исполнитель отклонен!")

    await artist_message(callback_query.message, _artist_controller, 0)


@admin_router.message(F.text == "Отзывы", AdminFilter())
async def review_message(message: Message) -> None:
    await message.bot.send_chat_action(
        chat_id=message.from_user.id, action=ChatAction.TYPING
    )
    await message.answer("Отзывы", reply_markup=main_keyboard)


@admin_router.message(F.text == "Заказы", AdminFilter())
async def orders_message(message: Message) -> None:
    await message.bot.send_chat_action(
        chat_id=message.from_user.id, action=ChatAction.TYPING
    )
    await message.answer("Заказы", reply_markup=main_keyboard)


@admin_router.message()
async def unknown_command(message: Message) -> None:
    await message.answer("Неизвестная команда")
