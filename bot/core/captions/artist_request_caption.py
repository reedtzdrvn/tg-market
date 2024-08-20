def generate_artist_request_caption(person):
    inst_info = f'<a href="https://instagram.com/{person.get("instagram")}">Ссылка</a>' if person.get('instagram') else "нет информации"
    vk_info = f'<a href="{person.get("vk")}">Ссылка</a>' if person.get('vk').startswith('https://') else "нет информации"
    youtube_info = f'<a href="{person.get("youtube")}">Ссылка</a>' if person.get('youtube').startswith('https://') else "нет информации"
    tiktok_info = f'<a href="{person.get("tiktok")}">Ссылка</a>' if person.get('tiktok').startswith('https://') else "нет информации"

    caption = f"""
ID: {person.get('_id')}
    
Имя Фамилия: {person.get('artistDetails', {}).get('firstName', '')} {person.get('artistDetails', {}).get('lastName', "")}
Номер телефона: {person.get('artistDetails').get('phoneNumber', "")}
Город: {person.get('city')}

Telegram: <a href="https://t.me/{person.get('artistDetails')['userName']}">Ссылка</a>

Instagram: {inst_info}
Вконтакте: {vk_info}
Youtube: {youtube_info}
Tiktok: {tiktok_info}
Цены: {person.get('price')}
Описание:
{f"<b>{person.get('description')}</b>" if person.get('description') else "нет информации"}

Видео на Youtube:
"""

    links = person.get('link_video', [])

    if len(links) > 0 and set(links) != {''}:
        for link in person.get("link_video", []):
            if link:
                caption += f'<a href="{link}">Ссылка</a>\n'
    else:
        caption += f'нет информации\n'

    caption += "\nКатегории:\n"

    for category in person.get("categoriesName", []):
        if category:
            caption += f"<b>{category.get('name')}</b>\n"


    return caption
