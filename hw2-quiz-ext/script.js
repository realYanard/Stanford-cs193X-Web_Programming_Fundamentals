// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.
var one = false;
var two = false;
var three = false;
var memoryChoices = new Array(3);
const choices = document.querySelectorAll(".choice-grid > div");
choices.forEach((oneChoice) => {
    oneChoice.addEventListener('click', onChoiceClick);
})

function onChoiceClick(event){
    const choice = event.currentTarget;
    const question = choice.parentNode;
    if(choice.dataset.questionId === "one"){
        memoryChoices[0] = choice.dataset.choiceId;
        one = true;
    }
    else if(choice.dataset.questionId === "two"){
        memoryChoices[1] = choice.dataset.choiceId;
        two = true;
    }
    else{
        memoryChoices[2] = choice.dataset.choiceId;
        three = true;
    }
    for(let nonChoice of question.children){
        nonChoice.style.backgroundColor = '#f4f4f4';
        nonChoice.getElementsByClassName("checkbox")[0].src = 'images/unchecked.png';
        nonChoice.style.opacity = 0.6;
    }
    choice.style.opacity = 1;
    choice.style.backgroundColor = '#cfe3ff';
    const checkbox = choice.getElementsByClassName("checkbox")[0];
    checkbox.src = 'images/checked.png';
    if(one && two && three){
        document.querySelectorAll(".choice-grid > div").forEach((oneChoice) => {
            oneChoice.removeEventListener('click', onChoiceClick);
        })
        computeResult();
    }
}

function computeResult(){
    let winner = memoryChoices[0];
    if(memoryChoices[1]==memoryChoices[2]){
        winner = memoryChoices[1];
    }
    const sectionResultat = document.createElement('section');
    sectionResultat.classList.add('result');
    const titreResultat = document.createElement('h2');
    titreResultat.textContent = 'You got: ' + RESULTS_MAP[winner].title;
    const descResultat = document.createElement('p');
    descResultat.textContent = RESULTS_MAP[winner].contents;
    const resetButton = document.createElement('button');
    resetButton.addEventListener('click', reset);
    resetButton.textContent = "Restart quiz";
    sectionResultat.appendChild(titreResultat);
    sectionResultat.appendChild(descResultat);
    sectionResultat.appendChild(resetButton);
    document.querySelector('article').appendChild(sectionResultat);
}

function reset(){
    choices.forEach((oneChoice) => {
        oneChoice.addEventListener('click', onChoiceClick);
        oneChoice.style.backgroundColor = '#f4f4f4';
        oneChoice.style.opacity = 1;
        oneChoice.getElementsByClassName("checkbox")[0].src = 'images/unchecked.png';
    })
    document.getElementsByClassName('result')[0].innerHTML = '';
    one = false;
    two = false;
    three = false;
    document.getElementsByClassName('question-name')[0].scrollIntoView(true);
}

