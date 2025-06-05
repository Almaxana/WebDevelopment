document.getElementById('deleteButton').addEventListener('click', function () {
  const userId = this.getAttribute("data-id");
  sendData(userId);
});

function sendData(userId) {
  fetch(`/user/delete/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}