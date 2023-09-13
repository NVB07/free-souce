const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const color1 = $('.input-color-1')
const color2 = $('.input-color-2')

const customRotate = $('.input-rotate')
const previewColor = $('.preview-sample')
const cssOutput = $('.css-text')
const btnCopy = $('.copy')

  
color1.addEventListener('input', changeRotate);
color2.addEventListener('input', changeRotate);
customRotate.addEventListener('input', changeRotate)

function changeRotate() {
    let degRotate= customRotate.value;
    $('.text-holder').innerHTML =`${degRotate}deg`
    textOutput( getColor(),degRotate)
}


function getColor() {
    let  arrColor= [color1.value, color2.value]
    return arrColor;
}

function textOutput(arrColor,rotate) {
    let textCSSOutput = `background-image: linear-gradient(${rotate}deg, ${arrColor[0]}, ${arrColor[1]});`
    cssOutput.innerHTML = textCSSOutput;
    previewColor.style = textCSSOutput
    $('.main').style = textCSSOutput

}



btnCopy.onclick = () => {
    navigator.clipboard.writeText(cssOutput.textContent);
    const copied = $('.copied');
    copied.style.display = 'block'
    setTimeout(function(){
        copied.style.display = 'none'
    }, 2000)
}

