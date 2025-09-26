import {
  getImagesByQuery,
PER_PAGE,
} from './js/pixabay-api.js';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showError,
  loadBtn,
  showWarning,
  scrollGalleryOnLoad,
  form,
  toggleLoadMoreButton,
} from './js/render-functions.js';

import './css/styles.css';

let search;
let maxPage;
let numberPage;
let imageType;
let orientation;

async function getImages(search, numberPage, imageType, orientation) {
  const response = await getImagesByQuery(
    search,
    numberPage,
    imageType,
    orientation
  );
  return response;
}

async function renderImagesPage(search, numberPage, imageType, orientation) {
  loadBtn.disabled = true;

  try {
    showLoader();
    const response = await getImages(
      search,
      numberPage,
      imageType,
      orientation
    );
   
    maxPage = Math.ceil(response.totalHits / PER_PAGE);
    if (maxPage === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please, try again!'
      );
      return;
    }
    
    createGallery(response.hits);
    if (numberPage > 1) {
      scrollGalleryOnLoad();
    }

    if (numberPage === maxPage) {
      showWarning();
    }
    
    toggleLoadMoreButton(numberPage, maxPage);
  } catch (error) {
    showError(`Error: ${error.message}`);
    return;
  } finally {
    hideLoader();
    loadBtn.disabled = false;
  }
}

form.addEventListener('submit', handleSearchSubmit);

async function handleSearchSubmit(event) {
  event.preventDefault();

  clearGallery();

  numberPage = 1;
  const elements = event.target.elements;
  search = elements.search.value.trim().replace(/\s+/g, '+');
  imageType = elements.typeImg.value;
  orientation = elements.orientation.value;

  if (!search) {
    return showError('Sorry, search query is empty!');
  }

  await renderImagesPage(search, numberPage, imageType, orientation);
  elements.search.value = '';
}

loadBtn.addEventListener('click', handleLoadMoreClick);

async function handleLoadMoreClick(event) {
  numberPage += 1;
  await renderImagesPage(search, numberPage, imageType, orientation);
}
