document.getElementById('submitButton').addEventListener('click', function () {
  const contentInput = document.getElementById('content');
  const user = document.getElementById('user');
  const reviewData = {
    content: contentInput.value,
    author: parseInt(user.value, 10)
  };


  sendData(reviewData);
});

function sendData(data) {
  fetch('/review/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.ok) {
        window.location.href = '/review/all';
      } else {
        console.error('Ошибка при создании отзыва');
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
}