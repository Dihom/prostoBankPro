'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll('.btn--show-modal-window');

const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModalWindow.forEach(button => button.addEventListener('click', openModalWindow));

// for (let i = 0; i < btnsOpenModalWindow.length; i++)
//   btnsOpenModalWindow[i].addEventListener('click', openModalWindow);

// btnCloseModalWindow.addEventListener('click', closeModalWindow);
// overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});


///////////////////////////////////////////////////
// Выбор элементов

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// console.log(document.querySelector('.header'));

// const sections = document.querySelectorAll('.section');
// console.log(sections);

// console.log(document.getElementById('section--1'));
// const buttons = document.getElementsByTagName('button')
// console.log(buttons);

// console.log(document.getElementsByClassName('btn'));


///////////////////////////////////////////////////
// Создание и вставка элементов
// .insertAdjacentHTML()

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'Мы используем на этом сайте cookie для улучшения функциональности';
// message.innerHTML = 'Мы используем на этом сайте cookie для улучшения функциональности. <button class="btn btn--close-cookie">Ok!</button>';

// const header = document.querySelector('.header');
// // header.prepend(message); // добавление элемента в начале блока
// header.append(message); // добавление элемента в конце блока
// // header.append(message.cloneNode(true)); // копирование и добавление элемента
// // header.before(message); // добавление элемента до блока
// // header.after(message); // добавление элемента после блока


// // Удаление элементов
// document.querySelector('.btn--close-cookie').addEventListener('click', function() {
//   message.remove(); // новый метод
//   // message.parentElement.removeChild(message); - старый метод
// });


// // Стили
// message.style.backgroundColor = '#076785';
// message.style.width = '120%';
// console.log(message.style.width);
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height = Number.parseFloat(getComputedStyle(message).height) + 50 + 'px';
// console.log(message.style.height);

// document.documentElement.style.setProperty('--color-first', 'yellow');


// // Атрибуты
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.getAttribute('src'));
// console.log(logo.className);

// // Нестандартный атрибут
// console.log(logo.getAttribute('название атрибута'))

// logo.setAttribute('copyright', 'Master Of Code')

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));


// // Data attributes
// console.log(logo.dataset.versionNumber); // versionNumber data attribute в HTML


// // CLasses
// logo.classList.add('a', 'b');
// logo.classList.remove('a', 'b')
// logo.classList.toggle('a')
// logo.classList.contains('c')

// // Не использовать
// logo.className = 'a';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e) {

    const section1Coords = section1.getBoundingClientRect();
    // console.log(section1Coords);
    // console.log(e.target.getBoundingClientRect());
    // console.log('Текущее прокручивание: x, y', window.pageXOffset, window.pageYOffset);
    // console.log('Ширина и высота viewport', document.documentElement.clientWidth, document.documentElement.clientHeight);

    // window.scrollTo(section1Coords.left + window.pageXOffset, section1Coords.top + window.pageYOffset);

      // Old method
    // window.scrollTo({
    //   left: section1Coords.left + window.pageXOffset, 
    //   top: section1Coords.top + window.pageYOffset,
    //   behavior: 'smooth',
    // });

      // New method
    section1.scrollIntoView({behavior: 'smooth'});
  });


  // Виды событий и обработчиков событий

  const h1 = document.querySelector('h1');
  // const clickMouseEnterH1 = function(e) {
  //   alert('addEventListener: You are now at the h1 element');
  //   h1.removeEventListener('click', clickMouseEnterH1);
  // };

  const clickMouseEnterH1 = function(e) {
    alert('addEventListener: You are now at the h1 element');
  };

  h1.addEventListener('click', clickMouseEnterH1);

  setTimeout(() => h1.removeEventListener('click', clickMouseEnterH1), 5000)

  // h1.onclick = function (e) {
  //   alert('onclick: You have clicked the h1 element');
  // }