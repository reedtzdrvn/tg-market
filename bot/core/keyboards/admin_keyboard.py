from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder

main_keyboard = ReplyKeyboardMarkup(
    keyboard=[
        [
            KeyboardButton(text="Исполнители"),
            KeyboardButton(text="Заказы"),
        ],
        [
            KeyboardButton(text="Отзывы"),
            KeyboardButton(text="Тех.поддержка"),
        ],
    ],
    resize_keyboard=True,
    input_field_placeholder="Выберите раздел, к которому желаете перейти.",
)

def build_artist_request_keyboard(page, total_pages, request_id, telegram_id):
    builder = InlineKeyboardBuilder()

    # Add pagination buttons
    if page > 0:
        builder.button(
            text="⬅️ Предыдущая",
            callback_data=f"artists_page_{page-1}"
        )
    if page < total_pages - 1:
        builder.button(
            text="Следующая ➡️",
            callback_data=f"artists_page_{page+1}"
        )

    builder.row(
        InlineKeyboardButton(
            text='Принять',
            callback_data=f"accept_artist_{request_id}_{telegram_id}"
        ),
        InlineKeyboardButton(
            text='Отклонить',
            callback_data=f"reject_artist_{request_id}_{telegram_id}"
        )
    )

    return builder.as_markup()
