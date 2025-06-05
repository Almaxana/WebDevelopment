document.getElementById('submitButton').addEventListener('click', function () {
  const tableNumber = document.getElementById('tableNumber');
  const reservationTime = document.getElementById('reservationTime');
  const user =  document.getElementById('user');

  const data = {
    tableNumber: parseInt(tableNumber.value, 10),
    reservationTime: reservationTime.value,
    userId: parseInt(user.value, 10)
  }
  console.log('Sending data:', data);
  sendData(data);
});

function sendData(data) {
  fetch('/reservation/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.ok) {
        window.location.href = '/reservation/all';
      } else {
        console.error('Ошибка при создании брони');
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
}
