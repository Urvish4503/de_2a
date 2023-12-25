document.getElementById('new-item-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const quantity = document.getElementById('quantity').value;
    const category = document.getElementById('category').value;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${description}</td>
        <td>${date}</td>
        <td>${quantity}</td>
        <td>${category}</td>
    `;

    document.getElementById('table-body').appendChild(newRow);
});