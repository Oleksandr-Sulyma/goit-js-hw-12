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
let maxPage = 0;
let numberPage = 1;
let imageType;
let orientation;
let domRect;
let searchMarker = true;

async function fetchImagesData(search, numberPage, imageType, orientation) {
  const response = await getImagesByQuery(
    search,
    numberPage,
    imageType,
    orientation
  );
   return response;
}

async function handleImageLoading(
  searchMarker,
  search,
  numberPage,
  imageType,
  orientation
) {
  try {
    showLoader();
    const response = await fetchImagesData(
      search,
      numberPage,
      imageType,
      orientation
    );
    createGallery(response.hits);
    toggleLoadMoreButton(numberPage, maxPage);
    if (searchMarker && response.totalHits !== 0) {
      maxPage = Math.ceil(response.totalHits / 15);
      domRect = galleryEl.querySelector('li').getBoundingClientRect();
      window.scrollBy({
      top: domRect.height * 2,
      behavior: 'smooth',
    });
    if (!searchMarker) {
      window.scrollBy({
        top: domRect.height * 2,
        behavior: 'smooth',
      });   
    }
    }
    
  } catch (error) {
    showError(`Error: ${error.message}`);
    console.log(error.message);
  } finally {
    hideLoader();
    showWarning(numberPage, maxPage);
    if (searchMarker) {
      elements.search.value = '';
    }
    console.log(numberPage, maxPage);
    toggleLoadMoreButton(numberPage, maxPage);
  }
}

form.addEventListener('submit', fetchImages);

async function fetchImages(event) {
  event.preventDefault();

  clearGallery();

  searchMarker = true;
  numberPage = 1;
  maxPage = 0;
  elements = event.target.elements;
  search = elements.search.value.trim().replace(/\s+/g, '+');
  imageType = elements.typeImg.value;
  orientation = elements.orientation.value;

  if (!search) {
    elements.search.value = '';
    return showError('Sorry, search query is empty!');
  }

  await handleImageLoading(
    searchMarker,
    search,
    numberPage,
    imageType,
    orientation
  );
}

loadBtn.addEventListener('click', loaderImages);

async function loaderImages(event) {
  searchMarker = false;
  numberPage += 1;
  await handleImageLoading(
    searchMarker,
    search,
    numberPage,
    imageType,
    orientation
  );
}
