let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg');
let messege = document.querySelector('#message');
let header = document.querySelector('header');
let btnContainer = document.querySelector('.btn');
let turnIndicator = document.querySelector('#turn-indicator');

btnContainer.classList.add('hide');

let turnO = true;

const winpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const newGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add('hide'); 
    header.classList.remove('hide'); 
    btnContainer.classList.add('hide');
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add('hide'); 
    newGameBtn.classList.add('hide'); 
    header.classList.remove('hide'); 
    btnContainer.classList.add('hide');
    turnIndicator.innerText = "Player O's turn";
}

const updateTurnText = () => {
    turnIndicator.innerText = `Player ${turnO ? 'O' : 'X'}'s turn`;
};

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        header.classList.add('hide');
        newGameBtn.classList.add('hide');
        turnIndicator.classList.remove('hide');
        if (turnO) {
            box.innerText = 'O';
            turnO = false;
        } else {
            box.innerText = 'X';
            turnO = true;
        }
        box.disabled = true;
        updateTurnText();
        checkWinner();
    });
});


const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    messege.innerText = `Congratulations! Player ${winner} wins!`;
    msgContainer.classList.remove('hide');
    newGameBtn.classList.remove('hide'); 
    resetBtn.classList.add('hide'); 
    turnIndicator.classList.add('hide'); 
    btnContainer.classList.remove('hide'); 
    disableBoxes();
};

const checkWinner = () => {

    for (let pattern of winpatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 != "" && pos1 != "" && pos3 != "" ) {
         if (pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return;
         }
        }
            resetBtn.classList.remove('hide'); 
    btnContainer.classList.remove('hide');
    }
    if ([...boxes].every(box => box.innerText)) {
        messege.innerText = ("It's a draw!");
        msgContainer.classList.remove('hide');
        newGameBtn.classList.remove('hide'); 
        resetBtn.classList.add('hide'); 
        btnContainer.classList.remove('hide');
        turnIndicator.classList.add('hide');
    }
};

newGameBtn.addEventListener('click', newGame);
resetBtn.addEventListener('click', resetGame);