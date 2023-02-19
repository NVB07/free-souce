<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="#" type="image/x-icon">
    <!-- <link rel="stylesheet" href="./Data/base.css"> -->
    <title>Document</title>
</head>
<body>
    <style>
        *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container{
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: black;
}

.main{
    position: relative;
    z-index: 2;
    width: 254px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    height: fit-content;
    overflow: hidden;
    box-shadow:0 0 20px -4px #4a4a4a;
}

.main::after{
    content: "";
    position: absolute;
    width: 500px;
    height: 500px;
    z-index: -2;
    transform-origin: 50% 50%;
    background-image: linear-gradient(black, red, blue,black);
    animation: rotate 5s linear infinite;

}

@keyframes rotate{
    from{
        transform: rotate(0);
    }
    to{
        transform: rotate(360deg);
    }
}

.main::before{
    content: "";
    width: 250px;
    height: calc(100% - 4px);
    border-radius: 10px;
    background-color: #000000;
    position: absolute;
    z-index: -1;
}

.clock{
    margin: 20px auto;
    width: 200px;
    height: 200px;
    border: 3px dashed #ffffff;
    border-radius: 50%;
    position: relative;
}
.hours{
    position: absolute;
    width: 8px;
    height: 25%;
    background-color: yellow;
    transform-origin: 4px 100%;
    top: 25%;
    left: 94px;
    border-top-right-radius: 100%;
    border-top-left-radius: 100%;
    box-shadow: 0 -1px 3px 0px red;
}

.minutes{
    position: absolute;
    width: 4px;
    height: 40%;
    background-color: #00b724;
    transform-origin: 2px 100%;
    top: 10%;
    left: 96px;
    border-top-right-radius: 100%;
    border-top-left-radius: 100%;
    box-shadow: 0 -1px 3px 0px red;
}

.secons{
    position: absolute;
    width: 2px;
    height: 45%;
    background-color: #fd0000;
    transform-origin: 1px 100%;
    top: 5%;
    left: 97px;
    border-top-right-radius: 100%;
    border-top-left-radius: 100%;
}

.dot{
    width: 15px;
    height: 15px;
    position: absolute;
    border-radius: 50%;
    background-color: red;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 3px 1px #FFF;
}

.clock-digital{
    width: 100%;
    height: 70px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 38px;
    text-align: center;
    line-height: 70px;
    color: #00b724;
    margin-bottom: 20px;
}
    </style>
    <div class="container">
        <div class="main">
            <div class="clock">
                <div class="hours"></div>
                <div class="minutes"></div>
                <div class="secons"></div>
                <div class="dot"></div>
            </div>
            <div class="clock-digital"></div>
        </div>
    </div>
    <!-- <script src="./Data/main.js"></script> -->
    <script>
        const $  =document.querySelector.bind(document);

var time;
var hour;
var minute;
var second;

var clockHour  = $(".hours")
var clockMinutes  = $(".minutes")
var clockSecons = $(".secons")
var digitalClock = $(".clock-digital")

function clock(){
    time = new Date();
    hour = time.getHours();
    minute = time.getMinutes();
    second = time.getSeconds();
    hour = hour % 12;

    var SeconDeg = second*6;
    var MinuteDeg = minute*6 + SeconDeg/60;
    var HourDeg = hour*30 + minute*30/60;
    clockHour.style.transform = "rotate("+HourDeg+"deg)"
    clockMinutes.style.transform = "rotate("+MinuteDeg+"deg)";
    clockSecons.style.transform = "rotate("+SeconDeg+"deg)"
}
function hvn(){
    time = new Date();
    hour = time.getHours();
    minute = time.getMinutes();
    second = time.getSeconds();
    if(hour < 10) {
        hour = "0" + hour;
    }
    if(minute < 10) {
        minute = "0" + minute;
    }
    if(second < 10) {
        second = "0" + second;
    }
    var now = hour + " : " + minute + " : " + second;   
    digitalClock.innerHTML = now;
    clock()
}                                                                
setInterval("hvn()",1000);

    </script>
</body>
</html>
