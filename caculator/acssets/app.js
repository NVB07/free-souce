const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var allKey = $$('.key')
var type = $('.type-text')
var result = $('.result')

var open = $('.parenthesis.open')
var close = $('.parenthesis.close')
var bin = $('.bin')
var ans = $('.history')
var hisValue = 0;
var memory= "" ;

document.onkeydown = (evt)=>{
    type.focus();
    console.log(evt.key)
    if(evt.key == 'Enter'){
        memory = type.value;
        if(memory == '$'){
            result.innerHTML = hisValue
        }
        else{
            try {
                if(memory.length<1){
                    result.innerHTML = "0";
                }
                else{
                    const equalChar = eval(memory)
                    hisValue = equalChar;
                    result.innerHTML = equalChar;
                }
            } catch (error) {
                result.innerHTML = "Syntax Error";  
            }
        }
    }
    if(evt.key == 'Escape'){
        memory = ""
        type.value = memory;
        result.innerHTML = 0;
    }
}

type.oninput=(e)=>{
    memory = e.target.value; 
}

open.onclick = ()=>{
    memory+='('
    type.value = memory
}
close.onclick = ()=>{
    memory+=')'
    type.value = memory
}

bin.onclick = ()=>{
   const binResult =  parseInt(type.value, 10).toString(2);
   memory+='Bin'
   type.value = memory
   result.innerHTML = binResult
}

ans.onclick = ()=>{
    type.value = '$'
    result.innerHTML  = hisValue;
}

for(let i=0; i< allKey.length; i++){
    allKey[i].onclick = ()=>{
        var attribute = allKey[i].getAttribute('name')
        if(attribute == "del"){
            const editedText = memory.slice(0, -1)
            memory = editedText;
            type.value = memory
        }
        else if(attribute == "ac"){
            memory = ""
            type.value = memory;
            result.innerHTML = 0;
        }
        else if(attribute == "="){
            memory = type.value;
            if(memory == '$'){
                result.innerHTML = hisValue
            }
            else{
                try {
                    if(memory.length<1){
                        result.innerHTML = "0";
                    }
                    else{
                        const equalChar = eval(memory)
                        hisValue = equalChar;
                        result.innerHTML = equalChar;
                    }
                } catch (error) {
                    result.innerHTML = "Syntax Error";  
                }
            }
        }
        else{
            memory += attribute;
            type.value = memory;
        }
    }
}