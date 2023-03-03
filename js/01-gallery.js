// Создание и рендер разметки по массиву данных galleryItems и
//  предоставленному шаблону элемента галереи.
// Реализация делегирования на div.gallery и получение url большого изображения.
// Подключение скрипта и стилей библиотеки модального окна basicLightbox.
// Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
// Открытие модального окна по клику на элементе галереи. Для
// этого ознакомься с документацией и примерами.
// Замена значения атрибута src элемента <img> в модальном окне
// перед открытием. Используй готовую разметку модального окна с изображением
// из примеров библиотеки basicLightbox.
// Разметка элемента галереи
// Ссылка на оригинальное изображение должна храниться в data-атрибуте
//  source на элементе <img>, и указываться в href ссылки. Не добавляй
//  другие HTML теги или CSS классы кроме тех, что есть в этом шаблоне.

// Обрати внимание на то, что изображение обернуто в ссылку, а значит
// при клике по умолчанию пользователь будет перенаправлен на другую страницу.
// Запрети это поведение по умолчанию.

// Закрытие с клавиатуры
// ВНИМАНИЕ
// Этот функционал не обязателен при сдаче задания, но будет хорошей дополнительной
//  практикой.

// Добавь закрытие модального окна по нажатию клавиши Escape. Сделай так, чтобы
// прослушивание клавиатуры было только пока открыто модальное окно. У библиотеки
//  basicLightbox есть метод для программного закрытия модального окна.

import { galleryItems } from "./gallery-items.js";

const markup = galleryItems
  .map(
    (el) =>
      `<div class="gallery__item">
  <a class="gallery__link" href="${el.original}">
    <img
      class="gallery__image"
      src="${el.preview}"
      data-source="${el.original}"
      alt="${el.description}"
      />
  </a>
</div>
      `
  )
  .join(""); // рядок, який містить версику картинок галереї

const galleryEl = document.querySelector(".gallery");

galleryEl.insertAdjacentHTML("beforeend", markup);

galleryEl.addEventListener("click", openLarge);

function openLarge(event) {
  event.preventDefault();
  const largeImgAddress = event.target.getAttribute("data-source");
  const instance = basicLightbox.create(`<img src="${largeImgAddress}" />`, {
    onClose: () => {
      document.removeEventListener("keydown", onEscapeDown);
    },
  });
  instance.show();

  document.addEventListener("keydown", onEscapeDown);
  function onEscapeDown(event) {
    event.preventDefault();
    if (event.keyCode == 27) {
      instance.close();
    }
  }
}
