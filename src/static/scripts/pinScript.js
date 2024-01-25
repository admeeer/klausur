document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('pinForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const pin = document.getElementById('pin').value;
        
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pin: pin })
        })
        .then(response => response.json())
        .then(data => {
            const resultElement = document.getElementById('result');
            if (data.result === 'correct') {
                resultElement.className = 'correct';
                resultElement.textContent = '☑';
                setTimeout(function() {
                    window.location.href = 'static/portal/'; 
                }, 3000);
            } else {
                resultElement.className = 'incorrect';
                resultElement.textContent = '☒';
            }
        });
    });
});
