// У файлі pixabay-api.js зберігай функції для виконання HTTP-запитів:
// getImagesByQuery(query, page). Ця функція повинна приймати два параметри query
// (пошукове слово, яке є рядком) та page (номер сторінки, яка є числом),
// здійснювати HTTP-запит і повертати значення властивості data з отриманої відповіді.

import axios  from 'axios';
const requestPixabay = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '49732510-ee91a196325b5e5f0a6aadbb3',
    safesearch: true,
    per_page: '15',
  },
});

export default async function getImagesByQuery(
  query,
  page = 1,
  imageType = 'photo',
  orientation = 'horizontal'
) {
  try {
     const res = await requestPixabay('', {
    params: {
      q: query,
      page: page,
      image_type: imageType,
      orientation: orientation,
    },
  });
 return res.data;
  } catch {
    throw error;    
  }
 
}