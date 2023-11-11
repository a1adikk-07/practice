// Якщо імейл і пароль користувача збігаються, зберігай дані з форми при сабміті
// у локальне сховище і змінюй кнопку login на logout і роби поля введення
// недоступними для змін.

// При перезавантаженні сторінки, якщо користувач залогінений, ми маємо бачити logout-кнопку
// та недоступні для зміни поля з даними користувача.
// Клік по кнопці logout повертає все до початкового вигляду і видаляє дані користувача
// З локального сховища.

// Якщо введені дані не збігаються з потрібними даними, викликати аlert і
// повідомляти про помилку.

const USER_DATA = {
  email: 'user@mail.com',
  password: 'secret',
};

const data = {};

const userForm = document.querySelector('.login-form');
const userBtn = document.querySelector('.login-btn');
const inputLogin = document.querySelector("input[name='email']");
const inputPassword = document.querySelector("input[name='password']");

userForm.addEventListener('input', onSaveData);
userForm.addEventListener('submit', onLogin);
if (localStorage.getItem('form-data')) checkLog();

function onSaveData(event) {
  const { name, value } = event.target;
  data[name] = value;
  console.log(data);
}
function onLogin(event) {
  event.preventDefault();
  if (!data.email || !data.password) return alert('Fill all fields');
  if (data.email !== USER_DATA.email || data.password !== USER_DATA.password)
    return alert('Incorrect data');
  checkLog();
  localStorage.setItem('form-data', JSON.stringify(data));
  userForm.reset();
}
function checkLog() {
  userBtn.textContent = 'Logout';
  inputLogin.setAttribute('readonly', true);
  inputPassword.setAttribute('readonly', true);
}
