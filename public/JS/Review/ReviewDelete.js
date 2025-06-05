document.getElementById('deleteButton').addEventListener('click', function () {
  const reviewId = this.getAttribute("data-id");
  sendData(reviewId);
});

function sendData(reviewId) {
  fetch(`/review/delete/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (response.ok) {
        window.location.href = '/review/all';
      } else {
        console.error('Ошибка при удалении отзыва');
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
}