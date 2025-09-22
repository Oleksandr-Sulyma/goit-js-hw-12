import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showError,
  showLoadMoreButton,
  hideLoadMoreButton,
  loadBtn,
  showWarning,
  galleryEl,
} from './js/render-functions';

import './css/styles.css';

const form = document.querySelector('.form');
const input = document.querySelector('.search-input');
const btn = document.querySelector('.btn-submit');

let elements = '';
let search = '';
let maxPage = 1;
let numberPage = 1;
let imageType = '';
let orientation = '';
let arrImage;
let domRect;

form.addEventListener('submit', event => {
  event.preventDefault();
  clearGallery();
  showLoader();
  elements = event.target.elements;
  search = elements.search.value.trim().replace(/\s+/g, '+');
  imageType = elements.typeImg.value;
  orientation = elements.orientation.value;

  if (!search) {
    hideLoader();
    event.target.elements.search.value = '';
    return showError('Sorry, you did not enter a query. Please try again!');
  }

  getImagesByQuery(search, numberPage, imageType, orientation)
    .then(res => {
      arrImage = res.hits;
      const totalHits = res.totalHits;

      if (totalHits === 0) {
        hideLoader();
        return showError(
          'Sorry, there are no images matching your search query. Please, try again!'
        );
      }
      createGallery(arrImage);
      maxPage = Math.ceil(totalHits / 15);
      if (numberPage === maxPage) {
        return showWarning(
          `We're sorry, but you've reached the end of search results.`
        );
      }
    })
    .catch(error => {
      showError(`Error: ${error.message}`);
      console.log('Error:', error.message);
    })
    .finally(() => {
      hideLoader();
      numberPage < maxPage && showLoadMoreButton();
      event.target.elements.search.value = '';

      domRect = galleryEl.querySelector('li').getBoundingClientRect();
      console.log(domRect);
      window.scrollBy({
        top: domRect.height * 2,
        behavior: 'smooth',
      });
    });
});

loadBtn.addEventListener('click', event => {
  numberPage += 1;
  hideLoadMoreButton();
  showLoader();

  getImagesByQuery(search, numberPage, imageType, orientation)
    .then(res => {
      arrImage = res.hits;
      createGallery(arrImage);

      if (numberPage < maxPage) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
        return showWarning(
          `We're sorry, but you've reached the end of search results.`
        );
      }
    })
    .catch(error => {
      showError(`Error: ${error.message}`);
      console.log('Error:', error.message);
    })
    .finally(() => {
      hideLoader();
      window.scrollBy({
        top: domRect.height * 2,
        behavior: 'smooth',
      });
    });
});
