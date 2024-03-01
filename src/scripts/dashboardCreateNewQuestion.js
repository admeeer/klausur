const createNewQuestionButton = document.getElementById('createNewQuestion');
const questionForm = document.getElementById('question-form');

createNewQuestionButton.addEventListener('click', () => {
  questionForm.style.display = 'block';
});

questionForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const questionType = document.getElementById('question-type').value;
    const questionText = document.getElementById('question-text').value;
    const answerText = document.getElementById('answer-text').value;
  
    // Create a new question
    const newQuestion = {
      type: questionType,
      question: questionText,
      answers: [answerText], // Add more answers as needed
    };
  
    // Add the new question to your questions
    // This will depend on how your questions are structured
    // For example, if questions is an array:
    questions.push(newQuestion);
  
    // Hide the form
    questionForm.style.display = 'none';
  });