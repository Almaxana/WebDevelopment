  document.getElementById('submitButton').addEventListener('click', function () {
  const row_to_add = document.getElementById('row_to_add');

  const inputs = row_to_add.querySelectorAll('input');
  const rowData = {};

  inputs.forEach(input => {
  rowData[input.name] = input.value;
  });

  sendData(rowData);
});

  function sendData(data) {
  fetch('/dish/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}
