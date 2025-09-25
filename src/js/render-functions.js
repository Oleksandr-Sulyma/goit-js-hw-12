import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import errorIcon from '../img/bi_x-octagon.svg';

export const form = document.querySelector('.form');
export const galleryEl = document.querySelector('.gallery');
export const loadBtn = document.querySelector('.btn-load');

const span = document.querySelector('.loader');
const loaderOverlay = document.querySelector('.loader-overlay');

// У файлі render-functions.js створи екземпляр SimpleLightbox
// для роботи з модальним вікном та зберігай функції для відображення
// елементів інтерфейсу:
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// createGallery(images). Ця функція повинна приймати масив images,
// створювати HTML-розмітку для галереї, додавати її в контейнер галереї
// та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.

export function createGallery(images) {
  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        user,
      }) =>
        `
        <li><a class="image-wrapper" href="${largeImageURL}">
<img class="image" src="${webformatURL}" alt='Tags: ${tags}' title="${tags}"/>
<ul class="stats-image">
<li class="stat-item">
<h3 class="stat-title">Likes</h3>
<p class="stat-text">${likes}</p>
</li>
<li class="stat-item">
<h3 class="stat-title">Views</h3>
<p class="stat-text">${views}</p>
</li>
<li class='stat-item'>
<h3 class="stat-title">Comments</h3>
<p class="stat-text">${comments}</p>
</li>
<li class='stat-item'>
<h3 class="stat-title">Downloads</h3>
<p class="stat-text">${downloads}</p>
</li>
</ul>
</a>
</li>
        `
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

// clearGallery(). Ця функція нічого не приймає та повинна
// очищати вміст контейнера галереї. Нічого не повертає.

export function clearGallery() {
  galleryEl.innerHTML = '';
  lightbox.refresh();
}

// showLoader(). Ця функція нічого не приймає, повинна додавати
//  клас для відображення лоадера. Нічого не повертає.

export function showLoader() {
  span.classList.add('active');
}

// hideLoader(). Ця функція нічого не приймає, повинна прибирати
//  клас для відображення лоадера. Нічого не повертає.

export function hideLoader() {
  span.classList.remove('active');
}

// showLoadMoreButton(). Ця функція нічого не приймає, повинна додавати клас
// для відображення кнопки Load more. Нічого не повертає.
export function showLoadMoreButton() {
  loadBtn.classList.add('active');
}

// hideLoadMoreButton(). Ця функція нічого не приймає, повинна прибирати клас
// для відображення кнопки Load more. Нічого не повертає.

export function hideLoadMoreButton() {
  loadBtn.classList.remove('active');
}

// toggleLoadMoreButton(numberPage, maxPage). Ця функція приймає номер
// поточної сторінки і загальну кількість сторінок і показує або ховає
// кнопку Load more в залежності від того, чи є ще сторінки для завантаження.
export function toggleLoadMoreButton(numberPage, maxPage) {
  if (numberPage < maxPage) {
    showLoadMoreButton();
  } else {
    hideLoadMoreButton();
  }
}

// showError(message). Ця функція приймає повідомлення помилки і відображає його для користувача
export function showError(message) {
  return iziToast.show({
    message: `${message}`,
    backgroundColor: '#ef4040',
    position: 'topRight',
    maxWidth: 482,
    messageColor: 'white',
    theme: 'dark',
    messageSize: '16',
    iconUrl: errorIcon,
  });
}

// showWarning(numberPage, maxPage). Ця функція нічого не приймає відображає повідомлення про 
// завантаження усіх сторінок 
export function showWarning() {
     iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      maxWidth: 482,
      messageSize: '16',
      messageColor: 'black',
    }); 
  }

// toggleElementsState(isDisabled). Ця функція булеве значення,
// яке вказує, чи потрібно відключити (true) або включити (false) елементи форми.
// export function toggleElementsState(isDisabled) {
//   const elements = form.elements;
//   for (let i = 0; i < elements.length; i++) {
//     elements[i].disabled = isDisabled;
//   }
//   loadBtn.disabled = isDisabled;
// }
