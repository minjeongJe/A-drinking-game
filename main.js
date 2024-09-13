//1. 랜덤번호 지정 
//2. 유저가 번호를 입력한다. 그리고 start라는 버튼을 누름 
//3. 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다! 
//4. 랜덤번호가 < 유저번호 Down!! 
//5. 랜덤번호가 > 유저번호 Up!! 
//6. Rest버튼을 누르면 게임이 리셋된다. 
//7. 5 번의 기회를 다쓰면 게임이 끝난다.  (더이상 추측 불가, 버튼이 disable) 
//8. 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다. 
//9. 유저가 이미 입력한 숫자를 또 입력하면, 알려준다., 기회를 깍지 않는다. 


let computerNum = 0;
let playBtn = document.getElementById("play-btn");
let inputArea = document.getElementById("input-area");
let resetBtn = document.getElementById("reset-btn");
let chance = 3;
let chanceArea = document.getElementById("chance-area");
let gameOver = false;
let resultArea = document.getElementById("result-area");
let history = [];
let historyNum = document.getElementById("history-num");
let alertArea = document.getElementById("alert-area");

playBtn.addEventListener("click",play);
resetBtn.addEventListener("click",reset);
inputArea.addEventListener("focus", function() {
    inputArea.value = "";
})

inputArea.addEventListener("keydown", function(event) {
    if (event.key === 'Enter' && !gameOver) {
        play();
    }
});

function randomNum() {
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log("정답",computerNum);
}

function play() {
    let userValue = parseInt(inputArea.value);

    if(userValue < 1 || userValue > 100 ) {
        resultArea.textContent = " 1과 100 사이의 숫자를 입력하세요!!"
        return;
    }

    if(history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요."
        return;
    }

    chance --;
    chanceArea.textContent= `남은 기호: ${chance}번`    

    if(userValue < computerNum) {
        resultArea.textContent = "UP!"
    }else if(userValue > computerNum) {
        resultArea.textContent = "Down!"
    }else {
       resultArea.textContent = "정답! 술먹일 사람 어서 지목해!"
       gameOver = true;
    }

    history.push(userValue);
    console.log(history);
    historyNum.textContent = `입력한 값: ${history.join(", ")} `;

    if (chance < 1 && !gameOver) {
        gameOver = true;
        alert("Game Over! 기회를 모두 사용했습니다.");
    }

    if (gameOver) {
        playBtn.disabled = true;
    }
    
    inputArea.value = "";
}

//초기화
function reset() {
    inputArea.value = "";
    alertArea.style.display = "none"; 

    randomNum();
    resultArea.textContent = "숫자를 입력하세요."
    chance = 3;
    chanceArea.textContent = "남은 기회: 3"
    historyNum .textContent =  "입력한 값: ";
    playBtn.disabled = false;
    gameOver = false;
    history = [];
}

randomNum();