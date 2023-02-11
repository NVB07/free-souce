const allBox = document.querySelectorAll(".box");
const resultContainer = document.getElementById("result");
const restartBtn = document.getElementById("restart");
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var endgame = $(".end-game")
var allForm = $("#form-text")
var formMod = $(".select-mod")
var OnePlayer = $("#one-player-mod");
var TwoPlayer = $("#two-player-mod");
var formOne = $(".form-one-player")
var formTwo = $(".form-two-player")
var soundWin = $("#sound-win")
var soundDrau = $("#sound-draw")

var submitOneInfor = $("#submit-one-player")
var submitTwoInfor = $("#submit-two-player")
//general
const checkList = [];
var currentPlayer;
let winStatus = false;

//2 player
var namePlayer1;
var namePlayer2;
var Xchecked;

function doneMod(){
    formMod.style.display = "none"
    if(OnePlayer.checked){
        formOne.style.display = "block"
    }
    else if (TwoPlayer.checked){
        formTwo.style.display = "block"
    }
}

submitTwoInfor.addEventListener('click',function(){
    allForm.style.display = "none"
    namePlayer1 = $("#pl1").value;
    namePlayer2 = $("#pl2").value;
    Xchecked = $("#check-x").checked;
    var upPoint1 = $(".nbx-score")
    var upPoint2 = $(".nbo-score")
    var player1Point = 0;
    var player2Point = 0;
    var Exam = 0;
    if(Xchecked){
        currentPlayer = "ZERO";
        $(".playing1").innerHTML = namePlayer1 + " (X)"
        $(".playing2").innerHTML = namePlayer2 + " (O)"
        $(".noti-play").innerHTML = namePlayer1
        Exam = 0;
    }
    else{
        currentPlayer = "CROSS";
        $(".playing1").innerHTML = namePlayer1 + " (O)"
        $(".playing2").innerHTML = namePlayer2 + " (X)"
        $(".noti-play").innerHTML = namePlayer1
        Exam = 1;
    }

    
    

    function areEqual(one, two) {
        if (one === two) return one;
        return false;
    }
    
    function checkEquality(currentPlayer, array) {
        for (const item of array) {
            const a = checkList[item[0]];
            const b = checkList[item[1]];
            if (areEqual(a, b) == currentPlayer) {
                return [item[0], item[1]];
            }
        }
        return false;
    }
    
    function blinkTheBox(val){
        
        if (val){
            for(const i of val){
                const box = document.querySelector(`[data-box-num="${i}"]`);
                box.classList.add('blink');
            }
            return true;
        }
        return false;
    }
    
    function isWin() {
        let val = false;
        if (checkList[0] == currentPlayer) {
            val = checkEquality(currentPlayer, [
                [1, 2],
                [3, 6],
                [4, 8],
            ]);
            if (val && blinkTheBox([0,...val])) return true;
        }
    
        if (checkList[8] == currentPlayer) {
            val = checkEquality(currentPlayer, [
                [2, 5],
                [6, 7],
            ]);
            if (val && blinkTheBox([8,...val])) return true;
        }
    
        if (checkList[4] == currentPlayer) {
            val = checkEquality(currentPlayer, [
                [1, 7],
                [3, 5],
                [2, 6],
            ]);
            if (val && blinkTheBox([4,...val])) return true;
        }
    
        return val;
    }
    
    function checkWin(len) {
        if (len >= 3 && isWin()) {
            winStatus = true;
            if (currentPlayer == "CROSS") {
                if(Exam == 0){
                    player1Point++;
                    upPoint1.innerHTML = player1Point;
                }
                else{
                    player2Point++;
                    upPoint2.innerHTML = player2Point;
                }
                soundWin.play()
                endgame.style.display= "flex"
                resultContainer.innerText = "X Won the Match.";
            } else {
                if(Exam == 1){
                    player1Point++;
                    upPoint1.innerHTML = player1Point;
                }
                else{
                    player2Point++;
                    upPoint2.innerHTML = player2Point;
                }
                soundWin.play()
                endgame.style.display= "flex"
                resultContainer.innerText = "O Won the Match.";
            }
        } else if (len == 8) {
            winStatus = true;
            soundDrau.play();
            endgame.style.display= "flex"
            resultContainer.innerText = "$ Match Draw.";
        }
    }
    
    function boxClick(e, player, boxNum){
        checkList[boxNum] = player;
        e.target.classList.add(player.toLowerCase());
        if(player ==='CROSS'){
            currentPlayer = 'CROSS'
            if(Exam == 1){
                $(".noti-play").innerHTML = namePlayer1
            }
            else{
                $(".noti-play").innerHTML = namePlayer2
            }
        }
        else{
            currentPlayer = 'ZERO'
            if(Exam == 0){
                $(".noti-play").innerHTML = namePlayer1
            }
            else{
                $(".noti-play").innerHTML = namePlayer2
            }
        }
    }
    
    
    function handleBoxClick(e) {
        const len = checkList.filter(Boolean).length;
        const boxNum = parseInt(e.target.getAttribute("data-box-num"));
        if (!winStatus && !checkList[boxNum]) {
            if (len >= 0 && currentPlayer == "CROSS") {
                boxClick(e,'ZERO',boxNum);
            } 
            else {
                boxClick(e,'CROSS',boxNum);
            }
            checkWin(len);
        }
    }
    
    restartBtn.addEventListener('click',function(){
        allBox.forEach(item => {
            item.classList.remove('cross','zero','blink');
        });
        checkList.length = 0;
        endgame.style.display= "none"
        winStatus = false;
    });
    
    allBox.forEach(item => {
        item.addEventListener('click',(e) => {
            document.querySelector("#sound-click").play();
            
            
            handleBoxClick(e)});
    });
});





//one player
submitOneInfor.addEventListener('click', function(){
    allForm.style.display = "none"
    var nameOnePlayer  = $("#one-player").value;
    var namePlay = $(".noti-play")
    var nametwopl = $$(".nbscore")
    for(let i = 0; i< nametwopl.length; i++){
        nametwopl[i].style.display = "none"

    }
    
    namePlay.innerHTML = nameOnePlayer;

    const BOX_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const BOX_MID_NUMBERS = [1, 3, 5, 7];
    let userWinList = [];
    let botWinList = [];

    function areEqual(one, two) {
        if (one === two) return one;
        return false;
    }

    function checkEquality(currentPlayer, array, list) {
        for (const item of array) {
            const a = list[item[0]];
            const b = list[item[1]];
            if (areEqual(a, b) == currentPlayer) {
            return [item[0], item[1]];
            }
        }
        return false;
    }

    function blinkTheBox(val, dontBlink = false) {
        if (dontBlink) return true;
        if (val) {
            for (const i of val) {
            const box = document.querySelector(`[data-box-num="${i}"]`);
            box.classList.add("blink");
            }
            return true;
        }
        return false;
    }

    function isWin(player = currentPlayer, list = checkList, dontBlink = false) {
        let val = false;
        if (list[0] == player) {
            val = checkEquality(
            player,
            [
                [1, 2],
                [3, 6],
                [4, 8]
            ],
            list
            );
            if (val && blinkTheBox([0, ...val], dontBlink)) return true;
        }

        if (list[8] == player) {
            val = checkEquality(
            player,
            [
                [2, 5],
                [6, 7]
            ],
            list
            );
            if (val && blinkTheBox([8, ...val], dontBlink)) return true;
        }

        if (list[4] == player) {
            val = checkEquality(
            player,
            [
                [1, 7],
                [3, 5],
                [2, 6]
            ],
            list
            );
            if (val && blinkTheBox([4, ...val], dontBlink)) return true;
        }

        return val;
    }

    function checkWin(len) {
        if (len >= 3 && isWin()) {
            winStatus = true;
            if (currentPlayer == "CROSS") {
                soundWin.play()
                endgame.style.display= "flex"
                resultContainer.innerText = "X Won the Match.";
            } else {
                soundDrau.play();
                endgame.style.display= "flex"
                resultContainer.innerText = "$ You lose !";
            }
        } else if (len == 8) {
            winStatus = true;
            soundDrau.play();
            endgame.style.display= "flex"
            resultContainer.innerText = "$ Match Draw.";
        }
        return winStatus;
    }

    function captureCenterOrCorner() {
        if (!checkList[4]) {
            return 4;
        } else if (!checkList[2]) {
            return 2;
        } else if (!checkList[6]) {
            return 6;
        } else if (!checkList[8]) {
            return 8;
        }
        return false;
    }

    function getBoxNumForBot(mainListLen) {
        let xWin = false;
        let dummyList = [];
        let dummyListLen;
        let dummyBoxNumbers = [];

        if (mainListLen === 1) {
            if (!checkList[4]) {
                return 4;
            } 
            else if (!checkList[2]) {
                return 2;
            } 
            else {
                return 8;
            }
        } else if (mainListLen === 3) {
            if (
                (checkList[0] && checkList[8] && checkList[0] == checkList[8]) ||
                (checkList[2] && checkList[6] && checkList[2] == checkList[6])
            ) {
                return BOX_MID_NUMBERS[Math.floor(Math.random() * 3)];
            }
        }

        dummyList = [...checkList];
        dummyListLen = dummyList.filter(Boolean).length;
        dummyBoxNumbers = [...BOX_NUMBERS];

        while (dummyListLen < 9 && dummyBoxNumbers.length) {
            botWinList = [];
            botWinList = [...checkList];
            let randNum = Math.floor(Math.random() * dummyBoxNumbers.length);
            let botNum = dummyBoxNumbers[randNum];
            if (!botWinList[botNum]) {
            dummyList[botNum] = "ZERO";
            botWinList[botNum] = "ZERO";
            if (isWin("ZERO", botWinList, true)) {
                return botNum;
            }
            }
            dummyBoxNumbers.splice(randNum, 1);
        } // while

        dummyList = [];
        dummyList = [...checkList];
        dummyListLen = dummyList.filter(Boolean).length;
        dummyBoxNumbers = [];
        dummyBoxNumbers = [...BOX_NUMBERS];

        while (dummyListLen < 9 && dummyBoxNumbers.length) {
            userWinList = [];
            userWinList = [...checkList];
            let randNum = Math.floor(Math.random() * dummyBoxNumbers.length);
            let botNum = dummyBoxNumbers[randNum];
            if (!userWinList[botNum]) {
            dummyList[botNum] = "CROSS";
            userWinList[botNum] = "CROSS";
            if (isWin("CROSS", userWinList, true)) {
                xWin = botNum;
                break;
            }
            }
            dummyBoxNumbers.splice(randNum, 1);
        }

        if (xWin === false && mainListLen === 3 && checkList[4] == "ZERO") {
            if (!checkList[3] && !checkList[5]) {
            return 3;
            } else if (!checkList[1]) {
            return 1;
            } else if (!checkList[7]) {
            return 7;
            }
        }
        return xWin;
    } // getBoxNumForBot

    function boxClick(targetBox, player, boxNum) {
        checkList[boxNum] = player;
        targetBox.classList.add(player.toLowerCase());
    }

    function handleBoxClick(e) {
        let len = checkList.filter(Boolean).length;
        const boxNum = parseInt(e.target.getAttribute("data-box-num"));
        let boxNumForBot;

        if (!winStatus && !checkList[boxNum]) {
            currentPlayer = "CROSS";
            boxClick(e.target, "CROSS", boxNum);

            if (checkWin(len) === false) {
            len = checkList.filter(Boolean).length;
            currentPlayer = "ZERO";
            boxNumForBot = getBoxNumForBot(len);

            if (boxNumForBot !== false) {
                boxClick(allBox[boxNumForBot], "ZERO", boxNumForBot);
                checkWin(len);
            } 
            else {
                boxNumForBot = captureCenterOrCorner();
                if (boxNumForBot) {
                    boxClick(allBox[boxNumForBot], "ZERO", boxNumForBot);
                    checkWin(len);
                } 
                else {
                    while (len < 9) {
                        boxNumForBot = Math.floor(Math.random() * 9);
                        if (!checkList[boxNumForBot]) {
                            boxClick(allBox[boxNumForBot], "ZERO", boxNumForBot);
                            checkWin(len);
                            break;
                        }
                    } // while
                }
            }
            } // checkWin
        }
    }

    restartBtn.addEventListener("click", function () {
        allBox.forEach((item) => {
            item.classList.remove("cross", "zero", "blink");
        });
        checkList.length = 0;
        currentPlayer = "CROSS";
        endgame.style.display= "none"
        winStatus = false;
    });

    allBox.forEach((item) => {
        item.addEventListener("click", (e) => {
            function audioplay(){
                document.querySelector("#sound-click").play();
            }
            audioplay();
            setTimeout(audioplay,300)
            handleBoxClick(e)
        });
    });

});
