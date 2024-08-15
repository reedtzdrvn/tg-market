from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo, KeyboardButton, ReplyKeyboardMarkup

from config import WEB_APP_URL

web_app_keyboard_inline = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(text="Перейти к WebApp", web_app=WebAppInfo(url=WEB_APP_URL)),
        ],
    ]
)

tech_keyboard = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text='Тех.поддержка')],
        [KeyboardButton(text="Открыть веб-апп"),]
    ],
    resize_keyboard=True,
    input_field_placeholder='Перейдите в приложение, либо напишите в тех.поддержку'
)