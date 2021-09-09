import './sass/main.scss';
import * as apiService from './apiService';
import cardTemplate from './templates/cardTemplate.hbs';
import { error, success} from '@pnotify/core';
import { defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaults.delay = 5000;
const debounce = require('lodash.debounce');

const formRef = document.querySelector('.search-form');
const rootCardRef = document.querySelector('.gallery');
const rootBtnRef = document.querySelector('.section__wrapper__btn');
let check;
let nameImage;
const verifyFn = (data) => {
    rootCardRef.innerHTML = '';
    if (data.hits.length === 0) {
        error({text: 'Oh noo! Image not found!!! :C'});
        return
    }
    if(data.hits.length >= 0) {
        success({text: 'Success!! We found your images :D'});
        return data;
    }
};

const renderCards = async (data, check) => {
    switch (check) {
        case "fetchImg" :
       try{
            const result = await apiService.fetchImgFn(data);
            verifyFn(result);
        rootCardRef.insertAdjacentHTML('beforeend', cardTemplate(result));
        } catch (err) {
            console.warn(err);
            error({text: 'Oh noo! We have error Try again!!!! :C'});
        }
        break;
        case "loadMoreImg" :
            try{
                const result = await apiService.fetchImgLoadMore(data);
            rootCardRef.insertAdjacentHTML('beforeend', cardTemplate(result));
            } catch (err) {
                console.warn(err);
                error({text: 'Oh noo! We have error Try again!!!! :C'});
            };
            const element = document.querySelector('.searchImg__section');
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'end',
            });
            break;
    };
};

const onclickLoadMoreBtn = async () => {
    renderCards(nameImage, check);
};

const onClickMoveUpBtn = () => {
    const element = document.querySelector('.searchImg__section');
element.scrollIntoView({
  behavior: 'smooth',
  block: 'start',
});
};

const onclickFn = (event) => {
    switch (event.target.dataset.value) {
        case "loadMore": 
        check = 'loadMoreImg';
        onclickLoadMoreBtn();
        break;
        case "MoveUp": 
        onClickMoveUpBtn();
        break;
    }
};

const onClickClear = () => {
    formRef.reset();
};

const inputFn = async (event) => {
    check = 'fetchImg';
    nameImage = event.target.value;
    renderCards(nameImage, check);
};
formRef.addEventListener('input', debounce((event) => {
    inputFn(event);
}, 650));

rootBtnRef.addEventListener('click', onclickFn);

document.querySelector('.search__clear__btn').addEventListener('click', onClickClear);