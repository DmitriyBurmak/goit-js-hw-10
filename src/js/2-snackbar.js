console.log('snackbar');
// Імпортуємо бібліотеку iziToast
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// import successIcon from '../';
// import errorIcon from '../img/error.svg';
// Отримуємо елементи форми
const form = document.querySelector('.form');
const inputDelay = form.querySelector('input[name="delay"]');
const radioFulfilled = form.querySelector('input[value="fulfilled"]');
const radioRejected = form.querySelector('input[value="rejected"]');

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Запобігаємо перезавантаженню сторінки

  const delay = Number(inputDelay.value); // Отримуємо затримку
  const state = radioFulfilled.checked ? 'fulfilled' : 'rejected'; // Визначаємо стан

  // Створюємо проміс
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay); // Виконуємо проміс
      } else {
        reject(delay); // Відхиляємо проміс
      }
    }, delay);
  });

  // Обробляємо результат промісу
  promise
    .then(delay => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        // iconUrl: successIcon,
        onOpening: function (instance, toast) {
          setTimeout(() => {
            toast.querySelector('.iziToast-title').style.color = '#fff'; // Змінюємо колір заголовка на зелений
          }, 100);
        },
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        // iconUrl: errorIcon,

        onOpening: function (instance, toast) {
          setTimeout(() => {
            toast.querySelector('.iziToast-title').style.color = '#fff'; // Змінюємо колір заголовка на червоний
          }, 100);
        },
      });
    });
});
