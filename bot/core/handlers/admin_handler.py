import types
from aiogram import Router, F, Bot
from aiogram.filters import Command
from aiogram.filters.callback_data import CallbackData
from aiogram.types import (
    Message,
    InputMediaPhoto,
    InlineKeyboardMarkup,
    InlineKeyboardButton,
    KeyboardButton,
    ReplyKeyboardMarkup,
    CallbackQuery,
)
from aiogram.enums import ChatAction

from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from bson import ObjectId
from aiogram.utils.keyboard import InlineKeyboardBuilder
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

class PromoCodeStates(StatesGroup):
    promo = State()
    count = State()
    tarifs = State() 
    discount_type = State()
    discount_value = State()

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
        pprint.pprint(page_data)
        print(f"{BACKEND_URL}{person.get('mainPhoto')}")
        print(f"{BACKEND_URL}{person.get('backGroundPhoto')}")
        for photo in person.get("photo"):
            print(f"{BACKEND_URL}{photo}")
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

    await bot.send_message(chat_id=telegram_id, text="Ваша анкета принята.")

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
        text=f"Ваша анкета отклонена.\nСвяжитесь с тех.поддержкой.\n\nПри написании сообщения приложите ID заявки, чтобы получить причину отклонения.\n\nID:{request_id}",
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

@admin_router.callback_query(F.data.startswith("select_tariff:"))
async def process_tariff_selection(callback_query: CallbackQuery, state: FSMContext, _tarifs_controller):
    tariff_id = ObjectId(callback_query.data.split(":")[1])
    
    data = await state.get_data()
    selected_tariffs = data.get("selected_tariffs", [])

    if tariff_id in selected_tariffs:
        selected_tariffs.remove(tariff_id)
    else:
        selected_tariffs.append(tariff_id)

    await state.update_data(selected_tariffs=selected_tariffs)

    builder = InlineKeyboardBuilder()
    
    tariffs = await _tarifs_controller.get_all_tarifs()
    
    for tariff in tariffs:
        if ObjectId(tariff["_id"]) in selected_tariffs:
            button_text = f"{tariff['name']} ✅"
        else:
            button_text = tariff["name"]
        
        button = InlineKeyboardButton(
            text=button_text,
            callback_data=f"select_tariff:{tariff['_id']}"
        )
        builder.add(button)

    builder.add(InlineKeyboardButton(text="Готово", callback_data="finish_selection"))

    await callback_query.message.edit_reply_markup(reply_markup=builder.adjust(1, 1, 1, 1).as_markup())

@admin_router.callback_query(F.data == "finish_selection")
async def finish_selection(callback_query: CallbackQuery, state: FSMContext):
    data = await state.get_data()
    selected_tariffs = data.get("selected_tariffs", [])
    await state.set_state(PromoCodeStates.tarifs)
    
    
    if selected_tariffs:
        await state.update_data(tarifs=[str(t) for t in selected_tariffs])
        
        await callback_query.answer()
        
        await set_tarifs(callback_query.message, state)
        
    else:
        await callback_query.answer("Вы не выбрали ни одного тарифа.")

@admin_router.message(F.text == "Добавить промокод")
async def add_promo_start(message: Message, state: FSMContext):
    await state.set_state(PromoCodeStates.promo)
    await message.answer("Введите название промокода:")

@admin_router.message(PromoCodeStates.promo)
async def set_promo(message: Message, state: FSMContext):
    await state.update_data(promo=message.text)
    await state.set_state(PromoCodeStates.count)
    await message.answer("Введите количество использования промокода:")

@admin_router.message(PromoCodeStates.count)
async def set_count(message: Message, state: FSMContext, _tarifs_controller):
    await state.update_data(count=int(message.text))
    
    builder = InlineKeyboardBuilder()
    
    data = await state.get_data()
    selected_tariffs = data.get("selected_tariffs", [])
    
    tariffs = await _tarifs_controller.get_all_tarifs()

    for tariff in tariffs:
        if tariff["_id"] in selected_tariffs:
            button_text = f"{tariff['name']} ✅"
        else:
            button_text = tariff["name"]
        
        button = InlineKeyboardButton(
            text=button_text,
            callback_data=f"select_tariff:{tariff['_id']}"
        )
        builder.add(button)

    builder.add(InlineKeyboardButton(text="Готово", callback_data="finish_selection"))

    await message.answer("Выберите тарифы:", reply_markup=builder.adjust(1, 1, 1, 1).as_markup())

@admin_router.message(PromoCodeStates.tarifs)
async def set_tarifs(message: Message, state: FSMContext):
    await state.set_state(PromoCodeStates.discount_type)
    
    await message.answer("Выберите тип скидки:\n1. Процент\n2. Фиксированная сумма", reply_markup=ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="Процент"), KeyboardButton(text="Фиксированная сумма")]
        ],
        resize_keyboard=True,
        one_time_keyboard=True
    ))

@admin_router.message(PromoCodeStates.discount_type)
async def choose_discount_type(message: Message, state: FSMContext):
    if message.text not in ["Процент", "Фиксированная сумма"]:
        await message.answer("Пожалуйста, выберите корректный тип скидки.")
        return

    await state.update_data(discount_type=message.text)
    await state.set_state(PromoCodeStates.discount_value)

    if message.text == "Процент":
        await message.answer("Введите процент скидки:")
    else:
        await message.answer("Введите фиксированную сумму скидки:")

@admin_router.message(PromoCodeStates.discount_value)
async def set_discount_value(message: Message, state: FSMContext, _promos_controller):
    try:
        discount_value = int(message.text)

        if (await state.get_data()).get('discount_type') == "Процент":
            if discount_value < 0 or discount_value > 100:
                await message.answer("Пожалуйста, введите корректный процент скидки (от 0 до 100).")
                return
        else:
            if discount_value < 0:
                await message.answer("Пожалуйста, введите корректную фиксированную сумму скидки (не отрицательную).")
                return

        await state.update_data(discount_value=discount_value)

        data = await state.get_data()
        promo = data.get('promo')
        count = data.get('count')
        tarifs = data.get('tarifs')
        discount_type = data.get('discount_type')

        await _promos_controller.add_promo(promo, count, tarifs, discount_value, discount_type)
        
        await message.answer(
            f"Промокод успешно добавлен!\n"
            f"Новый промокод: {promo}\n"
            f"Количество использования: {count}\n"
            f"Тарифы (id's): {', '.join(tarifs)}\n"
            f"Тип скидки: {discount_type}\n"
            f"Сумма скидки: {discount_value}",
            reply_markup=main_keyboard
        )

    except ValueError:
        await message.answer("Пожалуйста, введите корректное число для суммы скидки.", reply_markup=main_keyboard)
    
    await state.clear()

@admin_router.message()
async def unknown_command(message: Message) -> None:
    await message.answer("Неизвестная команда")
