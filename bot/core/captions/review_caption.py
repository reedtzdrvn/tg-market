def generate_review_caption(review, page, total_pages):
    caption = f"""
Отзыв оставил: {review.get('customerDetails')['firstName'] if review.get('customerDetails')['firstName'] else ""} {review.get('customerDetails')['lastName'] if review.get('customerDetails')['lastName'] else ""}
Исполнитель: {review.get('artistDetails')['firstName'] if review.get('artistDetails')['firstName'] else ""} {review.get('artistDetails')['lastName'] if review.get('artistDetails')['lastName'] else ""}

Оценка: {review.get('grade')}/5

Заголовок: {review.get('reviewTitle')}
Описание:
{review.get('reviewText')}

Страница: {page + 1}/{total_pages}
"""
    
    return caption