'use strict';


const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll('.btn--show-modal-window');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');



///////////////////////////////////////
// Modal window
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

/////////////////////////////////////////////////////
// Прокручивание страницы
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

  /////////////////////////////////////////////////
  // Smooth page navigation
  // document.querySelectorAll('.nav__link').forEach(function (htmlElement) {
  //   htmlElement.addEventListener('click', function (e) {
  //     e.preventDefault();
  //     const href = this.getAttribute('href')
  //     console.log(href);
  //     document.querySelector(href).scrollIntoView(
  //       {behavior: 'smooth'});
  //   });
  // }); // для небольшого количества элементов

////////////////////////////////////////////
  // Делегирование событий

  // 1. Добавляем event listener для ОБЩЕГО родителя
  document.querySelector('.nav__links').addEventListener('click', function(e) {
    e.preventDefault();

  // 2. Определить target элемент
    console.log(e.target);
    if(e.target.classList.contains('nav__link')) {
      const href = e.target.getAttribute('href');
      console.log(href);
      document.querySelector(href).scrollIntoView({behavior: 'smooth'});
    }
  });


///////////////////////////////////////////////////
// Вкладки

tabContainer.addEventListener('click', function(e) {
  const clickedButton = e.target.closest('.operations__tab');
  // Guard clause - Пункт охраны
  if(!clickedButton) return;

  // Выбор активной вкладки
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedButton.classList.add('operations__tab--active');

  // Активнй контент
  tabContents.forEach(content => content.classList.remove('operations__content--active'))
  document.querySelector(`.operations__content--${clickedButton.dataset.tab}`).classList.add('operations__content--active');
});



//////////////////////////////////////////////////////////
// Анимация потускнения на панели навигации
const navLinksHoverAnimation = function(e) {
  // console.log(this, e.currentTarget)
  if (e.target.classList.contains('nav__link')) {
    const linkOver = e.target;
    const siblingLinks = linkOver.closest('.nav__links').querySelectorAll('.nav__link');
    const logo = linkOver.closest('.nav').querySelector('img');
    const logoText = linkOver.closest('.nav').querySelector('.nav__text');

    siblingLinks.forEach(el => {
      if (el !== linkOver) el.style.opacity = this;
    });
    logo.style.opacity = this;
    logoText.style.opacity = this;
  }
};

// Работа с аргументами при помощи метода bind() / this
nav.addEventListener('mouseover', navLinksHoverAnimation.bind(0.4));

nav.addEventListener('mouseout', navLinksHoverAnimation.bind(1));



/////////////////////////////////////////////////////
// Sticky navigation

// const section1Coords = section1.getBoundingClientRect();
// // console.log(section1Coords);

// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY);

//   if (window.scrollY > section1Coords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });


//////////////////////////////////////////////////
// Sticky navigation - Intersection Observer API

// const observerCallback = function(entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }

// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const getStickyNav = function (entries) {
  const entry = entries[0];
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
  nav.classList.remove('sticky');
  }
}

const headerObserver = new IntersectionObserver(getStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);


///////////////////////////////////////////////////
// Появление частей сайта при прокручивании
const allSection = document.querySelectorAll('.section');

const appearanceSection = function(entries, observer) {
  const entry = entries[0];
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(appearanceSection, {
  root: null,
  threshold: 0.25,
});

allSection.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden')
});


///////////////////////////////////////////////////
// Lazy loading ленивая загрузка для изображений
const lazyImages = document.querySelectorAll('img[data-src]');

const loadImages = function (entries, observer) {
  const entry = entries[0];
  console.log(entry);

  if(!entry.isIntersecting) return;

  // Меняем изображение на изображение с высоким разрешением
  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove('lazy-img');

  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const lazyImagesObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0.7,
  // rootMargin: '300px',
});

lazyImages.forEach(image => lazyImagesObserver.observe(image));





/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

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


  // Виды событий и обработчиков событий

  // const h1 = document.querySelector('h1');
  // const clickMouseEnterH1 = function(e) {
  //   alert('addEventListener: You are now at the h1 element');
  //   h1.removeEventListener('click', clickMouseEnterH1);
  // };

  // const clickMouseEnterH1 = function(e) {
  //   alert('addEventListener: You are now at the h1 element');
  // };

  // h1.addEventListener('click', clickMouseEnterH1);

  // setTimeout(() => h1.removeEventListener('click', clickMouseEnterH1), 5000)

  // h1.onclick = function (e) {
  //   alert('onclick: You have clicked the h1 element');
  // }


  ///////////////////////////////////////////////////
// Event Propagation
// rgb(123, 56, 78)

// function getRandomIntInclusive (min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
// }

// const getRandomColor = () => `rgb(${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = getRandomColor();
//   console.log(this === e.currentTarget);
//   console.log('Link', e.target , e.currentTarget);
//   // Stop propagation
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = getRandomColor();
//   console.log(this === e.currentTarget);
//   console.log('Links', e.target , e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = getRandomColor();
//   console.log(this === e.currentTarget);
//   console.log('Nav', e.target , e.currentTarget);
// }
// // , true
// );

// document.querySelector('body').addEventListener('click', function (e) {
//   this.style.backgroundColor = getRandomColor();
//   console.log('Body', e.target , e.currentTarget)
//   console.log(this === e.currentTarget);
// });

///////////////////////////////////////////////
// DOM traversing (Перемещение по DOM)

// const h1 = document.querySelector('h1');

// // Перемещение вниз (потомок)
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.firstElementChild);
// h1.firstElementChild.style.color = 'yellow';
// console.log(h1.lastElementChild)

// // Перемещение вверх (к родителям)
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// const h2 = document.querySelector('h2');
// console.log(h2);
// // h2.closest('section').style.backgroundColor = 'blue';
// // h2.closest('h2').style.backgroundColor = 'green';

// // Перемещение в стороны
// console.log(h2.previousElementSibling)
// console.log(h2.nextElementSibling)

// console.log(h1.parentElement.children);
