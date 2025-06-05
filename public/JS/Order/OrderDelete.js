document.getElementById('deleteButton').addEventListener('click', function () {
  const orderId = this.getAttribute("data-id");
  sendData(orderId);
});

function sendData(orderId) {
  console.log("Отправка запроса на удаление заказа с ID:", orderId); // Проверяем ID
  fetch(`/order/delete/${orderId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
