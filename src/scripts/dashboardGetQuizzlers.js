document.addEventListener('DOMContentLoaded', (event) => {
    const quizzlersButton = document.getElementById('quizzlersButton');

    quizzlersButton.addEventListener('click', function() {
        fetch('/quizzlers/list')
        .then(response => response.json())
        .then(data => {
            const sidebar = document.querySelector('.list');

            sidebar.innerHTML = '';

            const newList = document.createElement('ul');

            data.forEach(name => {
                const listItem = document.createElement('li');
                const button = document.createElement('button');
                button.textContent = name;

                // Add a click event listener to the button
                button.addEventListener('click', function() {
                    // Fetch the quiz questions
                    fetch(`/quizzlers/quiz?name=${name}`)
                    .then(response => response.json())
                    .then(questions => {
                        // Get the center-screen element
                        const centerScreen = document.querySelector('.center-screen');

                        // Clear the center-screen
                        centerScreen.innerHTML = '';

                        // For each question, create a paragraph and add it to the center-screen
                        questions.forEach(question => {
                            const paragraph = document.createElement('p');
                            paragraph.textContent = question;
                            centerScreen.appendChild(paragraph);
                        });
                    })
                    .catch(error => console.error('Error:', error));
                });

                listItem.appendChild(button);
                newList.appendChild(listItem);
            });

            sidebar.appendChild(newList);
        })
        .catch(error => console.error('Error:', error));
    });
});