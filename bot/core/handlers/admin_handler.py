from aiogram import Router, F, Bot
from aiogram.filters import Command
from aiogram.types import (
    Message,
    InputMediaPhoto,
    InlineKeyboardMarkup,
    InlineKeyboardButton,
    CallbackQuery,
)
from aiogram.enums import ChatAction
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from bson import ObjectId

from core.filters.Admin import AdminFilter
from core.keyboards.admin_keyboard import (
    main_keyboard,
    build_artist_request_keyboard,
    build_customer_request_keyboard,
    build_reviews_keyboard
)
from core.captions.artist_request_caption import generate_artist_request_caption
from core.captions.customer_request_caption import generate_customer_request_caption
from core.captions.review_caption import generate_review_caption

from core.databases.mongodb.artist.controller import ArtistController
from core.databases.mongodb.customer.controller import CustomerController
from core.databases.mongodb.review.controller import ReviewController

import pprint

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
    
    if not data:
        await message.answer("Заявки исполнителей закончились.")
        return

    items_per_page = 1
    total_pages = (len(data) + items_per_page - 1) // items_per_page

    start = page * items_per_page
    end = start + items_per_page
    page_data = data[start:end]

    for person in page_data:
        caption = generate_artist_request_caption(person)

        media = [
            InputMediaPhoto(
                media=f"{BACKEND_URL}{person.get('mainPhoto')}", caption=caption
            ),
            InputMediaPhoto(media=f"{BACKEND_URL}{person.get('backGroundPhoto')}"),
        ]

        for photo in person.get("photo"):
            media.append(InputMediaPhoto(media=f"{BACKEND_URL}{photo}"))


        await message.answer_media_group(media=media)

        keyboard = build_artist_request_keyboard(
            page,
            total_pages,
            person.get("_id"),
            person.get("artistDetails")["telegramId"],
        )

        await message.answer(
            "Страница {}/{}".format(page + 1, total_pages), reply_markup=keyboard
        )


@admin_router.callback_query(F.data.startswith("artists_page_"), AdminFilter())
async def paginate_artists(
    callback_query: CallbackQuery, _artist_controller: ArtistController
) -> None:
    page = int(callback_query.data.split("_")[-1])

    await artist_message(callback_query.message, _artist_controller, page)

    await callback_query.answer()


@admin_router.callback_query(F.data.startswith("accept_artist_"), AdminFilter())
async def accept_artist(
    callback_query: CallbackQuery, _artist_controller: ArtistController, bot: Bot
) -> None:
    telegram_id = int(callback_query.data.split("_")[-1])
    request_id = ObjectId(callback_query.data.split("_")[-2])

    await _artist_controller.accept_artist_request(request_id)

    await bot.send_message(chat_id=telegram_id, text="Ваша заявка принята.")

    await callback_query.answer("Исполнитель принят!")

    await artist_message(callback_query.message, _artist_controller, 0)


@admin_router.callback_query(F.data.startswith("reject_artist_"), AdminFilter())
async def reject_artist(
    callback_query: CallbackQuery, _artist_controller: ArtistController, bot: Bot
) -> None:
    telegram_id = int(callback_query.data.split("_")[-1])
    request_id = ObjectId(callback_query.data.split("_")[-2])

    await bot.send_message(
        chat_id=telegram_id,
        text=f"Ваша заявка отклонена.\nСвяжитесь с тех.поддержкой.\n\nПри написании сообщения приложите ID заявки, чтобы получить причину отклонения.\n\nID:{request_id}",
    )

    await _artist_controller.reject_artist_request(request_id)

    await callback_query.answer("Исполнитель отклонен!")

    await artist_message(callback_query.message, _artist_controller, 0)


@admin_router.message(F.text == "Отзывы", AdminFilter())
async def review_message(
    message: Message,
    _review_controller: ReviewController,
    page: int = 0,
    is_editing: bool = True,
) -> None:
    await message.bot.send_chat_action(
        chat_id=message.from_user.id, action=ChatAction.TYPING
    )

    data = await _review_controller.get_unapproved_reviews()

    if not data:
        await message.answer("Отзывов нет.")
        return

    items_per_page = 1
    total_pages = (len(data) + items_per_page - 1) // items_per_page

    start = page * items_per_page
    end = start + items_per_page
    page_data = data[start:end]

    for review in page_data:
        caption = generate_review_caption(review, page, total_pages)

        if message.from_user.id != message.chat.id:
            if is_editing:
                await message.edit_text(
                    text=caption,
                    reply_markup=build_reviews_keyboard(
                        page,
                        total_pages,
                        review.get("_id"),
                        review.get("customerDetails")["telegramId"],
                        review.get("artistDetails")["telegramId"],
                    ),
                )
                return

        await message.answer(
            text=caption,
            reply_markup=build_reviews_keyboard(
                page,
                total_pages,
                review.get("_id"),
                review.get("customerDetails")["telegramId"],
                review.get("artistDetails")["telegramId"],
            ),
        )

@admin_router.callback_query(F.data.startswith("review_page_"), AdminFilter())
async def paginate_review(
    callback_query: CallbackQuery, _review_controller: ReviewController
) -> None:
    page = int(callback_query.data.split("_")[-1])

    await review_message(
        callback_query.message, _review_controller, page, is_editing=True
    )

    await callback_query.answer()


@admin_router.callback_query(F.data.startswith("accept_review_"), AdminFilter())
async def accept_review(
    callback_query: CallbackQuery, _review_controller: ReviewController, bot: Bot
) -> None:
    artist_telegram_id = int(callback_query.data.split("_")[-1])
    customer_telegram_id = int(callback_query.data.split("_")[-2])
    review_id = ObjectId(callback_query.data.split("_")[-3])

    await _review_controller.accept_review(review_id)

    await bot.send_message(chat_id=customer_telegram_id, text="Ваша отзыв принят.")

    await bot.send_message(chat_id=artist_telegram_id, text="Вам пришел новый отзыв.")

    await callback_query.answer("Отзыв принят!")

    await review_message(
        callback_query.message, _review_controller, 0, is_editing=False
    )


@admin_router.callback_query(F.data.startswith("reject_review_"), AdminFilter())
async def reject_review(
    callback_query: CallbackQuery, _review_controller: ReviewController, bot: Bot
) -> None:
    customer_telegram_id = int(callback_query.data.split("_")[-1])
    review_id = ObjectId(callback_query.data.split("_")[-2])

    await bot.send_message(
        chat_id=customer_telegram_id,
        text=f"Ваш отзыв отклонен",
    )

    await _review_controller.reject_review(review_id)

    await callback_query.answer("Отзыв отклонен!")

    await review_message(
        callback_query.message, _review_controller, 0, is_editing=False
    )

@admin_router.message(F.text == "Заказы", AdminFilter())
async def orders_message(
    message: Message,
    _customer_controller: CustomerController,
    page: int = 0,
    is_editing=True,
) -> None:
    await message.bot.send_chat_action(
        chat_id=message.from_user.id, action=ChatAction.TYPING
    )

    data = await _customer_controller.get_unapproved_customer_requests()

    if not data:
        await message.answer("Заявки заказчиков закончились.")
        return

    items_per_page = 1
    total_pages = (len(data) + items_per_page - 1) // items_per_page

    start = page * items_per_page
    end = start + items_per_page
    page_data = data[start:end]

    for request in page_data:
        caption = generate_customer_request_caption(request, page, total_pages)

        if message.from_user.id != message.chat.id:
            if is_editing:
                await message.edit_text(
                    text=caption,
                    reply_markup=build_customer_request_keyboard(
                        page,
                        total_pages,
                        request.get("_id"),
                        request.get("artistDetails")["telegramId"],
                    ),
                )
                return

        await message.answer(
            text=caption,
            reply_markup=build_customer_request_keyboard(
                page,
                total_pages,
                request.get("_id"),
                request.get("artistDetails")["telegramId"],
            ),
        )


@admin_router.callback_query(F.data.startswith("customer_page_"), AdminFilter())
async def paginate_customers(
    callback_query: CallbackQuery, _customer_controller: CustomerController
) -> None:
    page = int(callback_query.data.split("_")[-1])

    await orders_message(
        callback_query.message, _customer_controller, page, is_editing=True
    )

    await callback_query.answer()


@admin_router.callback_query(F.data.startswith("accept_customer_"), AdminFilter())
async def accept_customer(
    callback_query: CallbackQuery, _customer_controller: CustomerController, bot: Bot
) -> None:
    telegram_id = int(callback_query.data.split("_")[-1])
    request_id = ObjectId(callback_query.data.split("_")[-2])

    await _customer_controller.accept_customer_request(request_id)

    await bot.send_message(chat_id=telegram_id, text="Ваша заявка принята.")

    await callback_query.answer("Заказ принят!")

    await orders_message(
        callback_query.message, _customer_controller, 0, is_editing=False
    )


@admin_router.callback_query(F.data.startswith("reject_customer_"), AdminFilter())
async def reject_customer(
    callback_query: CallbackQuery, _customer_controller: CustomerController, bot: Bot
) -> None:
    telegram_id = int(callback_query.data.split("_")[-1])
    request_id = ObjectId(callback_query.data.split("_")[-2])

    await bot.send_message(
        chat_id=telegram_id,
        text=f"Ваша заявка отклонена.\nСвяжитесь с тех.поддержкой.\n\nПри написании сообщения приложите ID заявки, чтобы получить причину отклонения.\n\nID:{request_id}",
    )

    await _customer_controller.reject_customer_request(request_id)

    await callback_query.answer("Заказ отклонен!")

    await orders_message(
        callback_query.message, _customer_controller, 0, is_editing=False
    )

@admin_router.message()
async def unknown_command(message: Message) -> None:
    await message.answer("Неизвестная команда")
