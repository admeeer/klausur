document.getElementById('connectForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var inputPin = document.getElementById('pin').value;

    fetch('/check-teacher-pin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin: inputPin }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '/static/portal/dashboard/index.html';
        } else {
            alert('Incorrect pin');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});