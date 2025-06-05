document.getElementById('submitButton').addEventListener('click', function () {
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const role = document.getElementById('role');

  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    role: role.value
  }
  const userId = this.getAttribute("data-id");

  sendData(data, userId);
});

function sendData(data, userId) {
  fetch(`/user/update/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.ok) {
        window.location.href = '/user/all';
      } else {
        console.error('Ошибка при изменении отзыва');
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
}