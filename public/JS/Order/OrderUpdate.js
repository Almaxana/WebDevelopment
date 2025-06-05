document.getElementById('update-order-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Отменяем стандартную отправку формы через POST
  const form = event.target;
  const formData = new FormData(form);

  const data = {
    dishIds: formData.getAll('dishIds').map(Number),
  };

  try {
    const response = await fetch(form.action, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      window.location.href = '/order/all';
    } else {
      const error = await response.json();
      alert(error.message || 'Ошибка при обновлении заказа');
    }
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Произошла ошибка при отправке данных');
  }
});