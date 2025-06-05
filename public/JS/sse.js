// const eventSource = new EventSource('/sse');
// eventSource.onmessage = ({ data }) => {
//   const message = document.createElement('div');
//   message.className = 'notification'; // Применяем стили
//   message.innerText = data;
//
//   const notifications = document.getElementById('notifications');
//   notifications.appendChild(message);
//
//   // Удаляем уведомление через 10 секунд
//   setTimeout(() => {
//     message.remove();
//   }, 10000);
// };