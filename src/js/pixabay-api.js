// У файлі pixabay-api.js зберігай функції для виконання HTTP-запитів:
// getImagesByQuery(query, page). Ця функція повинна приймати два параметри query
// (пошукове слово, яке є рядком) та page (номер сторінки, яка є числом),
// здійснювати HTTP-запит і повертати значення властивості data з отриманої відповіді.

import axios from 'axios';
const requestPixabay = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    safesearch: true,
  },
});

const KEY_PIXABAY = '49732510-ee91a196325b5e5f0a6aadbb3';
export const PER_PAGE = 15;

export async function getImagesByQuery(
  q,
  page = 1,
  imageType = 'photo',
  orientation = 'horizontal'
) {
  try {
    const res = await requestPixabay('', {
      params: {
        q,
        page,
        image_type: imageType,
        orientation,
        key: KEY_PIXABAY,
        per_page: PER_PAGE,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}
