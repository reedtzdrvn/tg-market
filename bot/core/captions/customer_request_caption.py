import datetime

def generate_customer_request_caption(request, page, total_pages):
    caption = f"""
ID: {request.get('_id')}

Имя фамилия <b>Заказчика</b>: {request.get('artistDetails')['firstName'] if request.get('artistDetails')['firstName'] else ""} {request.get('artistDetails')['lastName'] if request.get('artistDetails')['lastName'] else ""}
Номер телефона: {request.get('artistDetails')['phoneNumber']}

Telegram: <a href="https://t.me/{request.get('artistDetails')['userName']}">Ссылка</a>

Город: {request.get('city')}
Название МП: {request.get('eventName')}
Дата: {request.get('date').strftime("%B %d, %Y")}
Время: {request.get('time')}
Описание:
{f"<b>{request.get('description')}</b>" if request.get('description') else "нет информации"}

Цены: {request.get('fee')}
Количество гостей: {request.get('guestCount')}

Категории:
"""
    
    for category in request.get("categoriesName", []):
        if category:
            caption += f"<b>{category.get('name')}</b>\n"

    caption += f"\nСтраница {page + 1}/{total_pages}"

    return caption