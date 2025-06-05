document.getElementById('submitButton').addEventListener('click', function () {
  const row_to_add = document.getElementById('row_to_add');
  const dishId = this.getAttribute("data-id");

  const inputs = row_to_add.querySelectorAll('input');
  const rowData = {};

  inputs.forEach(input => {
    rowData[input.name] = input.value;
  });

  sendData(rowData,dishId);
});

function sendData(data, dishId) {
  fetch(`/dish/update/${dishId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}
