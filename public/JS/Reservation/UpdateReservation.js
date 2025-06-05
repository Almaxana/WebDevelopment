document.getElementById('submitButton').addEventListener('click', function () {
  const tableNumber = document.getElementById('tableNumber');
  const reservationTime = document.getElementById('reservationTime');
  const data = {
    tableNumber: parseInt(tableNumber.value, 10),
    reservationTime: reservationTime.value
  }
  const reservationId = this.getAttribute("data-id");

  sendData(data, reservationId);
});

function sendData(data, reservationId) {
  fetch(`/reservation/update/${reservationId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.ok) {
        window.location.href = '/reservation/all';
      } else {
        console.error('Ошибка при изменении отзыва');
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
}