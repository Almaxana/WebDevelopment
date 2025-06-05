document.getElementById('deleteButton').addEventListener('click', function () {
  const reservationId = this.getAttribute("data-id");
  sendData(reservationId);
});

function sendData(reservationId) {
  fetch(`/reservation/delete/${reservationId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}