document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const keyboard = document.getElementById("keyboard");

    const wordList = ["apple", "baker", "candy", "dream", "early", "fancy", "grape", "happy", "igloo", "jolly", "kitty", "lemon", "mango", "nanny", "olive", "puppy", "queen", "rover", "silly", "tulip", "ultra", "violet", "watch", "xenon", "yummy", "zebra"];
    let secretWord = wordList[Math.floor(Math.random() * wordList.length)];

    let currentRow = 0;
    let currentTile = 0;
    const grid = Array(6).fill(null).map(() => Array(5).fill(""));

    function createBoard() {
        for (let i = 0; i < 30; i++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            gameBoard.appendChild(tile);
        }
    }

    function createKeyboard() {
        const keys = [
            ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
            ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
            ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"]
        ];

        keys.forEach(row => {
            const rowElement = document.createElement("div");
            rowElement.classList.add("keyboard-row");
            row.forEach(key => {
                const keyElement = document.createElement("button");
                keyElement.textContent = key;
                keyElement.classList.add("key");
                if (key === "enter" || key === "backspace") {
                    keyElement.classList.add("large");
                }
                keyElement.addEventListener("click", () => handleKeyPress(key));
                rowElement.appendChild(keyElement);
            });
            keyboard.appendChild(rowElement);
        });
    }

    function handleKeyPress(key) {
        if (key === "backspace") {
            if (currentTile > 0) {
                currentTile--;
                const tile = gameBoard.children[currentRow * 5 + currentTile];
                tile.textContent = "";
                grid[currentRow][currentTile] = "";
                tile.classList.remove("filled");
            }
            return;
        }

        if (key === "enter") {
            if (currentTile === 5) {
                checkWord();
            }
            return;
        }

        if (currentTile < 5 && currentRow < 6) {
            const tile = gameBoard.children[currentRow * 5 + currentTile];
            tile.textContent = key;
            tile.classList.add("filled");
            grid[currentRow][currentTile] = key;
            currentTile++;
        }
    }

    function checkWord() {
        const guess = grid[currentRow].join("");

        for (let i = 0; i < 5; i++) {
            const tile = gameBoard.children[currentRow * 5 + i];
            const letter = guess[i];
            const keyElement = Array.from(keyboard.querySelectorAll(".key")).find(key => key.textContent === letter);

            setTimeout(() => {
                if (secretWord[i] === letter) {
                    tile.classList.add("correct");
                    keyElement.classList.add("correct");
                } else if (secretWord.includes(letter)) {
                    tile.classList.add("present");
                    keyElement.classList.add("present");
                } else {
                    tile.classList.add("absent");
                    keyElement.classList.add("absent");
                }
            }, i * 300);
        }

        if (guess === secretWord) {
            setTimeout(() => alert("You win!"), 1600);
            return;
        }

        currentRow++;
        currentTile = 0;

        if (currentRow === 6) {
            setTimeout(() => alert(`You lose! The word was ${secretWord}`), 1600);
        }
    }

    createBoard();
    createKeyboard();
});
