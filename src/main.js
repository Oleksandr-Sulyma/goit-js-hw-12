import getImagesByQuery from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showError,
  loadBtn,
  showWarning,
  galleryEl,
  form,
  toggleLoadMoreButton,
} from './js/render-functions.js';

import './css/styles.css';

const input = document.querySelector('.search-input');
const btn = document.querySelector('.btn-submit');

let elements;
let search;
let maxPage;
let numberPage;
let imageType;
let orientation;


async function fetchImagesData(search, numberPage, imageType, orientation) {
  const response = await getImagesByQuery(
    search,
    numberPage,
    imageType,
    orientation
  );
  return response;
}

async function handleImageLoading(search, numberPage, imageType, orientation) {
  loadBtn.disabled = true;

  try {
    showLoader();
    const response = await fetchImagesData(
      search,
      numberPage,
      imageType,
      orientation
    );
    // console.log(response);
    maxPage = Math.ceil(response.totalHits / 15);
    if (maxPage === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please, try again!'
      );
      return;
    }
    // console.log('Max page - ', maxPage);
    // if (maxPage > 0) {
    //    console.log('Number page - ', numberPage);
    // }
    createGallery(response.hits);

    if (numberPage > 1) {
      const firstLi = galleryEl.querySelector('li');
      if (firstLi) {
        const domRect = firstLi.getBoundingClientRect();
        window.scrollBy({
        top: domRect.height * 2,
        behavior: 'smooth',
      });
      }      
      
    }
  } catch (error) {
    showError(`Error: ${error.message}`);
    console.log(error.message);
    return;
  } finally {
    hideLoader();
    loadBtn.disabled = false;
    if (numberPage === maxPage) {
      showWarning();
    }
    // console.log(numberPage, maxPage);
    toggleLoadMoreButton(numberPage, maxPage);
  }
}

form.addEventListener('submit', fetchImages);

async function fetchImages(event) {
  event.preventDefault();

  clearGallery();

  numberPage = 1;
  elements = event.target.elements;
  search = elements.search.value.trim().replace(/\s+/g, '+');
  imageType = elements.typeImg.value;
  orientation = elements.orientation.value;

  if (!search) {
    return showError('Sorry, search query is empty!');
  }

  await handleImageLoading(search, numberPage, imageType, orientation);
  elements.search.value = '';
}

loadBtn.addEventListener('click', loaderImages);

async function loaderImages(event) {
  numberPage += 1;
  await handleImageLoading(search, numberPage, imageType, orientation);
}
