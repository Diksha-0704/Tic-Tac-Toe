let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtns = document.querySelectorAll(".new"); 
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msgContainer");
let draw = document.querySelector(".draw");
let turnO = true;  //playerX  playerO
const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let count = 0;

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.innerText === "") { 
            if (turnO) {
                //playerO turn
                box.innerText = "O";
                turnO = false;
            } else {
                //playerX turn
                box.innerText = "X";
                turnO = true;
            }
            box.disabled = true;
            count++;
            checkWinner();
            if (count === 9 && msgContainer.classList.contains("hide")) {
                draw.classList.remove("hidden");
            }
        }
    });
});

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return; // Exit the function if we have a winner
            }
        }
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    draw.classList.add("hidden"); // Ensure draw message is hidden if there is a winner
    disableBoxes();
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
    count = 0;
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    draw.classList.add("hidden"); 
}

resetBtn.addEventListener("click", resetGame);
newBtns.forEach(btn => btn.addEventListener("click", resetGame)); 
