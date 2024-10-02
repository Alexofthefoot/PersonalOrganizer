// JavaScript to handle form submission
document.getElementById('tarot-new-card').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // Send data to the server
    fetch('/add-card', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        alert('Card added successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error adding card.');
    });
});