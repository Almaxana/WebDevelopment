document.getElementById('create-order-form').addEventListener('submit', async (event) => {
event.preventDefault(); // Отменяем стандартную отправку формы

const form = event.target;
const formData = new FormData(form);

const data = {
  dishIds: formData.getAll('dishIds').map(Number),
  authorId: Number(formData.get('author'))
};

try {
  const response = await fetch(form.action, {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json',
},
  body: JSON.stringify(data),
});

if (response.ok) {
  window.location.href = '/order/all';
} else {
  // Обработка ошибок
  const error = await response.json();
  alert(error.message || 'Ошибка при создании заказа');
}
} catch (error) {
  console.error('Ошибка:', error);
  alert('Произошла ошибка при отправке данных');
}
});
