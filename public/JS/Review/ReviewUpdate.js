document.getElementById('submitButton').addEventListener('click', function () {
  const contentInput = document.getElementById('content');
  const reviewData = { content: contentInput.value };
  const reviewId = this.getAttribute("data-id");

  sendData(reviewData, reviewId);
});

function sendData(data, reviewId) {
  fetch(`/review/update/${reviewId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.ok) {
        window.location.href = '/review/all';
      } else {
        console.error('Ошибка при изменении отзыва');
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
}