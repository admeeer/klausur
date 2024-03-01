document.addEventListener('DOMContentLoaded', (event) => {
    const quizzlersButton = document.getElementById('quizzlersButton');
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
                .then(quiz => {
                    // Get the center-screen element
                    const centerScreen = document.querySelector('.center-screen');

                    // Clear the center-screen
                    centerScreen.innerHTML = '';

                    quiz.questions.forEach(question => {
                        const questionDiv = document.createElement('div');
                        questionDiv.className = 'question-div';

                        // ----------------- Start Question Type -----------------

                        const questionTypeDiv = document.createElement('div');
                        questionTypeDiv.className = 'question-type-div';

                        const questionTypeElement = document.createElement('span');
                        questionTypeElement.className = 'question-type';
                        questionTypeElement.textContent = 'Question Type:';

                        const questionTypeSelect = document.createElement('select');

                        questionTypeSelect.addEventListener('change', function(event) {
                            /*const questionText = questionDiv.querySelector('.question-text');
                            if (questionText) {
                                questionText.textContent = ''; // Clear text content, or set it to something else
                            }*/

                          });
                        
                        questionTypeSelect.className = 'question-type-select';

                        const types = ['true false', 'single choice', 'multiple choice', 'drag and drop'];
                        types.forEach(type => {
                          const option = document.createElement('option');
                          option.value = type;
                          option.textContent = type;
                      
                          // Set the current question type as the selected option
                          if (question.type === type) {
                            option.selected = true;
                          }
                      
                          questionTypeSelect.appendChild(option);
                        });

                        questionTypeDiv.appendChild(questionTypeElement);
                        questionTypeDiv.appendChild(questionTypeSelect);
                        
                        questionDiv.appendChild(questionTypeDiv);

                        // ----------------- End Question Type -----------------

                        // ----------------- Start Question Time -----------------

                        const questionTimeDiv = document.createElement('div');
                        questionTimeDiv.className = 'question-time-div';


                        const questionTimeElement = document.createElement('span');
                        questionTimeElement.textContent = 'Time:';
                        questionTimeElement.className = 'question-time';

                        const questionTimeField = document.createElement('input');
                        questionTimeField.className = 'question-time-field';
                        questionTimeField.type = 'number';
                        questionTimeField.value = question.time;
                        
                        questionTimeDiv.appendChild(questionTimeElement);
                        questionTimeDiv.appendChild(questionTimeField);

                        questionDiv.appendChild(questionTimeDiv);

                        // ----------------- End Question Time -----------------

                        // ----------------- Start Question -----------------

                        const questionTextDiv = document.createElement('div');
                        questionTextDiv.className = 'question-text-div';
                    
                        const questionTextElement = document.createElement('span');
                        questionTextElement.setAttribute('contenteditable', 'true');
                        questionTextElement.className = 'question-text';
                        questionTextElement.textContent = 'Question:';
                        
                        const questionTextField = document.createElement('input');
                        questionTextField.className = 'question-text-field';
                        questionTextField.type = 'text';
                        questionTextField.value = question.question;


                        questionTextDiv.appendChild(questionTextElement);
                        questionTextDiv.appendChild(questionTextField);

                        questionDiv.appendChild(questionTextDiv);

                        // ----------------- End Question -----------------

                        switch(question.type){
                            case 'true false':

                                const trueFalseDiv = document.createElement('div');
                                trueFalseDiv.className = 'true-false-div';

                                const trueFalseElement = document.createElement('span');
                                trueFalseElement.textContent = 'Answer:';

                                const trueFalseSelect = document.createElement('select');
                                trueFalseSelect.className = 'true-false-select';

                                const trueOption = document.createElement('option');
                                trueOption.value = 'true';
                                trueOption.textContent = 'true';

                                const falseOption = document.createElement('option');
                                falseOption.value = 'false';
                                falseOption.textContent = 'false';

                                trueFalseSelect.appendChild(trueOption);
                                trueFalseSelect.appendChild(falseOption);

                                trueFalseDiv.appendChild(trueFalseElement);
                                trueFalseDiv.appendChild(trueFalseSelect);

                                questionDiv.appendChild(trueFalseDiv);
                                break;

                            case 'single choice':

                                const singleChoiceDiv = document.createElement('div');
                                singleChoiceDiv.className = 'single-choice-div';
                            
                                const singleChoiceOptionsLabel = document.createElement('span');
                                singleChoiceOptionsLabel.textContent = 'Options:';
                                singleChoiceDiv.appendChild(singleChoiceOptionsLabel);
                            
                                question.options.forEach((option) => {
                                const singleOptionInput = document.createElement('input');
                                singleOptionInput.type = 'text';
                                singleOptionInput.className = 'option-input';
                                singleOptionInput.value = option;
                            
                                singleChoiceDiv.appendChild(singleOptionInput);
                                });

                                questionDiv.appendChild(singleChoiceDiv);

                                const singleAnswerDiv = document.createElement('div');
                                singleAnswerDiv.className = 'answer-div';
                            
                                const singleAnswerLabel = document.createElement('span');
                                singleAnswerLabel.textContent = 'Answer:';
                            
                                const singleAnswerInput = document.createElement('input');
                                singleAnswerInput.type = 'text';
                                singleAnswerInput.className = 'answer-input';
                                singleAnswerInput.value = question.answers[0];

                                singleAnswerDiv.appendChild(singleAnswerLabel);
                                singleAnswerDiv.appendChild(singleAnswerInput);
                            
                                questionDiv.appendChild(singleAnswerDiv);
                                break;
                                
                            case 'multiple choice':
                                const multipleChoiceDiv = document.createElement('div');
                                multipleChoiceDiv.className = 'multiple-choice-div';

                                const multipleChoiceOptionsLabel = document.createElement('span');
                                multipleChoiceOptionsLabel.textContent = 'Options:';
                                multipleChoiceDiv.appendChild(multipleChoiceOptionsLabel);

                                question.options.forEach((option) => {
                                    const multipleOptionInput = document.createElement('input');
                                    multipleOptionInput.type = 'text';
                                    multipleOptionInput.className = 'option-input';
                                    multipleOptionInput.value = option;
                                
                                    multipleChoiceDiv.appendChild(multipleOptionInput);
                                    });

                                const multipleChoiceTextField = document.createElement('input');
                                multipleChoiceTextField.className = 'multiple-choice-text-field';
                                multipleChoiceTextField.type = 'text';
                                multipleChoiceTextField.value = question.answers[0];

                                multipleChoiceDiv.appendChild(multipleChoiceTextField);

                                questionDiv.appendChild(multipleChoiceDiv);

                                const multipleAnswerDiv = document.createElement('div');
                                multipleAnswerDiv.className = 'answer-div';
                            
                                const multipleAnswerLabel = document.createElement('span');
                                multipleAnswerLabel.textContent = 'Answer:';

                                multipleAnswerDiv.appendChild(multipleAnswerLabel);

                                question.answers.forEach((answer) => {
                                    const multipleAnswerInput = document.createElement('input');
                                    multipleAnswerInput.type = 'text';
                                    multipleAnswerInput.className = 'answer-input';
                                    multipleAnswerInput.value = answer;

                                    multipleAnswerDiv.appendChild(multipleAnswerInput);
                                    });
                            
                                questionDiv.appendChild(multipleAnswerDiv);
                                break;
                            case 'drag and drop':
                                const dragAndDropDiv = document.createElement('div');
                                dragAndDropDiv.className = 'drag-and-drop-div';

                                const dragAndDropOptionsLabel = document.createElement('span');
                                dragAndDropOptionsLabel.textContent = 'Pairs:';
                                dragAndDropDiv.appendChild(dragAndDropOptionsLabel);
                                    
                                question.pairs.forEach((pair) => {
                                    const [item, classification] = pair;
                                  
                                    const pairDiv = document.createElement('div');
                                  
                                    const itemInput = document.createElement('input');
                                    itemInput.type = 'text';
                                    itemInput.className = 'item-input';
                                    itemInput.value = item;
                                    pairDiv.appendChild(itemInput);
                                  
                                    const classificationInput = document.createElement('input');
                                    classificationInput.type = 'text';
                                    classificationInput.className = 'classification-input';
                                    classificationInput.value = classification;
                                    pairDiv.appendChild(classificationInput);
                                  
                                    dragAndDropDiv.appendChild(pairDiv);
                                  });

                                questionDiv.appendChild(dragAndDropDiv);
                        }

                        centerScreen.appendChild(questionDiv);

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