from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo

from config import WEB_APP_URL

web_app_keyboard_inline = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(text="Перейти к WebApp", web_app=WebAppInfo(url=WEB_APP_URL)),
        ],
    ]
)