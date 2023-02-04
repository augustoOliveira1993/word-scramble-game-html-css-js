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
        notifyError(`Tempo Esgotado! ${correctWord.toUpperCase()} era a palavra correta. Por favor, tente novamente!`);
        initGame();

    }, 1000);
}

const initGame = () => {
    initTimer(30);
    let randowObj = allWOrds[Math.floor(Math.random() * allWOrds.length)];
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
    if (!userWord) return notifyError("Insira uma verificação de palavras válida!")
    if (userWord.toLowerCase() !== correctWord) {
        notifyError(`Oops! ${userWord} não está correto. Por favor, tente novamente!`)
        return
    }
    notifySucess(`Parabéns! ${userWord} está correto. Você ganhou!`)

    initGame();

}
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
