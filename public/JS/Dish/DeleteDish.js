document.getElementById('deleteButton').addEventListener('click', function () {
  const dishId = this.getAttribute("data-id");
  sendData(dishId);
});

function sendData(dishId) {
  fetch(`/dish/delete/${dishId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
