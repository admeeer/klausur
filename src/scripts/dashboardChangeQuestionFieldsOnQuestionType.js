const questionTypeSelects = document.getElementsByClassName('question-type-select');

for (let i = 0; i < questionTypeSelects.length; i++) {
  questionTypeSelects[i].addEventListener('change', function(event) {
    const questionType = event.target.value;
    const inputFieldsContainer = event.target.parentNode.getElementsByClassName('inputFieldsContainer')[0];

    inputFieldsContainer.innerHTML = '';

    switch (questionType) {
      case 'single choice':
        inputFieldsContainer.appendChild(createInputField('question'));
        inputFieldsContainer.appendChild(createInputField('options'));
        inputFieldsContainer.appendChild(createInputField('correctAnswer'));
        break;
      case 'true false':
        inputFieldsContainer.appendChild(createInputField('question'));
        inputFieldsContainer.appendChild(createInputField('correctAnswer'));
        break;
      case 'multiple choice':
        inputFieldsContainer.appendChild(createInputField('question'));
        inputFieldsContainer.appendChild(createInputField('options'));
        inputFieldsContainer.appendChild(createInputField('correctAnswers'));
        break;
      case 'drag and drop':
        inputFieldsContainer.appendChild(createInputField('question'));
        inputFieldsContainer.appendChild(createInputField('pairs'));
        break;
    }
  });
}

function createInputField(name) {
  const label = document.createElement('label');
  label.textContent = name;

  const input = document.createElement('input');
  input.name = name;

  const div = document.createElement('div');
  div.appendChild(label);
  div.appendChild(input);

  return div;
}