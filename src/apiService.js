const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '22109359-3adbb821e95063555b380e03c';
let pageNumber = 1;
const fetchImgFn = (searchImg) => {
    pageNumber = 1;
   return fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchImg}&page=${pageNumber}&per_page=12&key=${API_KEY}`)
    .then(res => res.json())
    .catch(err => console.warn(err));
};

const fetchImgLoadMore = (infoImg) => {
    pageNumber += 1;
    return fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${infoImg}&page=${pageNumber}&per_page=12&key=${API_KEY}`)
    .then(res => res.json())
    .catch(err => console.warn(err));
};

export {fetchImgFn, fetchImgLoadMore};