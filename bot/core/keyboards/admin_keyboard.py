from aiogram.types import ReplyKeyboardMarkup, KeyboardButton

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
