// select all dom
const buttons = document.querySelectorAll('#card_btn .btn');
const selectedPlayer = document.getElementById('selected');
const errorMessage = document.getElementById("error-message");


// Button click and selected player update
function addPlayer(playerName) {
    const li = document.createElement('li');
    li.innerText = playerName;
    selectedPlayer.appendChild(li);
}

// global variable
let selectedPlayerList = 0;

for (const button of buttons) {
    button.addEventListener('click', (e) => {
        if (selectedPlayer.children.length <= 4) {
            button.classList.add('disabled');
            addPlayer(button.parentNode.children[0].innerText);
            selectedPlayerList = selectedPlayer.children.length;
        } else {
            button.classList.remove('disabled');
            // addPlayer(button.parentNode.children[0].innerText)
            errorMessage.classList.remove('d-none');
            // alert('5 Player already Selected');
        }
    })
}

// A common function for getInput value
function getInputValue(inputId) {
    const inputField = document.getElementById(inputId).value;
    const inputFieldValue = parseFloat(inputField);
    document.getElementById(inputId).value = '';
    return inputFieldValue
};

function setValueOfElement(elementId, value) {
    const element = document.getElementById(elementId);
    element.innerText = value;
}



// Budgets add event listeners
document.getElementById('calculate_budget').addEventListener('click', function () {
    const perPlayerBudget = getInputValue('per_player_budget');
    if (perPlayerBudget < 0 || isNaN(perPlayerBudget)) {
        setValueOfElement('player_expense', 'Enter Positive Number');
        return
    }

    let totalPlayerExpense = perPlayerBudget * selectedPlayerList + " TK";
    setValueOfElement('player_expense', totalPlayerExpense);


})
document.getElementById('calculate_total_budget').addEventListener('click', function () {
    const perPlayerBudget = document.getElementById('player_expense');
    const managerBudget = getInputValue('manager_budget');
    const coachBudget = getInputValue('coach_budget');

    if (perPlayerBudget.innerText == 'Enter Positive Number' || isNaN(managerBudget) || isNaN(coachBudget)) {
        setValueOfElement('player_total_expense', 'Not a valid Budget');
        return;
    } else if (managerBudget < 0 || coachBudget < 0) {
        setValueOfElement('player_total_expense', 'Enter Positive Budget');
        return;
    }


    const playerTotalBudget = parseFloat(perPlayerBudget.innerText)
    let totalExpense = playerTotalBudget + managerBudget + coachBudget + ' TK';
    setValueOfElement('player_total_expense', totalExpense)
})

