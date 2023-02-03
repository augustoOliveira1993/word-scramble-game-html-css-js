const wordText = document.querySelector(".word"),
    hitText = document.querySelector(".hint span"),
    timerText = document.querySelector(".time b"),
    refreshBtn = document.querySelector(".refresh-word"),
    checkBtn = document.querySelector(".check-word"),
    inputField = document.querySelector("#input-field");

let correctWord, timer;

const initTimer = maxTimer => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTimer > 0) {
            maxTimer--;
            return timerText.innerText = maxTimer;
        }
        clearInterval(timer);
        notifyError(`Timer off! ${correctWord.toUpperCase()} was the correct word. Please try again!`);
        initGame();

    }, 1000);
}

const initGame = () => {
    initTimer(30);
    let randowObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randowObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = wordArray[i];
        wordArray[i] = wordArray[j];
        wordArray[j] = temp;

    }

    wordText.innerText = wordArray.join("");
    hitText.innerText = randowObj.hint
    correctWord = randowObj.word.toLowerCase()
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length)
}

initGame();


const checkWord = () => {
    let userWord = inputField.value;
    if (!userWord) return notifyError("Please enter a word check")
    if (userWord.toLowerCase() !== correctWord) {
        notifyError(`Oops! ${userWord} is not correct. Please try again!`)
        return
    }
    notifySucess(`Congratulations! ${userWord} is correct. You won!`)

    initGame();

}
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
