import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let timerId = null;

// Ініціалізація flatpickr
flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedTime = selectedDates[0];
    if (selectedTime <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'illegal operation',
      });
      refs.startBtn.disabled = true;
    } else {
      userSelectedDate = selectedTime;
      refs.startBtn.disabled = false;
    }
  },
});

// Додаємо подію на кнопку "Start"
refs.startBtn.addEventListener('click', startTimer);

function startTimer() {
  refs.startBtn.disabled = true;
  refs.input.disabled = true;

  timerId = setInterval(() => {
    const timeLeft = userSelectedDate - new Date();
    if (timeLeft <= 0) {
      clearInterval(timerId);
      updateTimerUI(0);
      refs.input.disabled = false;
      return;
    }
    updateTimerUI(timeLeft);
  }, 1000);
}

// Функція оновлення UI
function updateTimerUI(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
}

// Функція перетворення мс у дні, години, хвилини, секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
}

// Функція додавання ведучих нулів
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
