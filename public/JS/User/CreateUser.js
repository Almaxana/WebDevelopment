document.getElementById('submitButton').addEventListener('click', function () {
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const role = document.getElementById('role');

  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    role: role.value
  }

  sendData(data);
});

function sendData(data) {
  fetch('/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}
