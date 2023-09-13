
const roll = document.querySelector('.roll')
const enterItem = document.querySelector('.enter-item')
const add = document.querySelector('.add')

//canvas
var myCanvas = document.getElementById("myCanvas");
myCanvas.width = 300;
myCanvas.height = 300;
var ctx = myCanvas.getContext("2d");

let items = ['C/C++', 'Javascript','Python'] // array items


const app = {
  drawPieSlice: function(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
  },
  text: function(ctx, items,x,y, rotate ) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotate);
    let color = '#fff'
    ctx.font="16px Comic Sans MS";
    ctx.fillStyle = color;
    ctx.textAlign = "end";
    ctx.fillText(items,140,0);
    ctx.restore();
  },
  getRandomColor: function() {
    let r = Math.floor(Math.random() * 200);
    let g = Math.floor(Math.random() * 200);
    let b = Math.floor(Math.random() * 200);
    let color = "rgb(" + r + "," + g + "," + b + ")";
    return color;
  },
  renderCircle: function() {
    for(let i =0; i<items.length; i++){
      this.drawPieSlice(ctx, 150,150,150, i*( Math.PI*2/items.length) - ( Math.PI*2/items.length)/2, 
      (i+1)*( Math.PI*2/items.length) - ( Math.PI*2/items.length)/2, this.getRandomColor());
      this.text(ctx, items[i],150,150,( Math.PI*2/items.length)*i )
    }
  },
  randomItem:function() {
    const randomIndex = Math.floor(Math.random() * items.length);
    return randomIndex;
  },
  animate: function(deg, duration){
    document.querySelector('#myCanvas').animate([
      { transform: `rotateZ(${deg}deg)`},
    ], 
      {
        duration: duration,
        easing: 'ease-out',
        iterations: 1,
        fill: 'forwards'
      }
    );
  },
  rollAnimate: function() {
    roll.onclick = () =>{
      let randomResuit = this.randomItem()
      let deg =-(360/items.length)*(randomResuit) +3600
      this.animate(deg, 3000)
      roll.disabled="disabled"
      setTimeout(()=> {
        this.animate(deg-3600, 1)
        roll.disabled=""
        this.showNotifi(randomResuit)
      },4000)
    }
  },
  showNotifi: function(result){
    const notify = document.querySelector('.notify')
    const delResult = document.querySelector('.delete-result')
    const cancelResult = document.querySelector('.cancel-result')
    notify.style.display = 'block'
    document.querySelector('.notify-header .result').innerHTML = items[result]
    delResult.onclick = () => {
      items.splice(result,1)
      this.showArray()
      this.renderCircle()
      this.animate(0, 1)
      notify.style.display = 'none'
    }
    cancelResult.onclick=() => {
      notify.style.display = 'none'
    }
  },
  showArray: function() {
    let listRender = items.map((item, index) => {
      return `<li class="item">
                <div class="item-name">${index+1}. ${item} </div>
                <button class="delete-item"> X </button>
              </li>`
    })
    document.querySelector('.list-items').innerHTML = listRender.join('')
    let delbtn = document.querySelectorAll('.delete-item');
    this.delItem(delbtn)
  },
  addItem: function() {
    enterItem.onkeydown = (e) => {
      if( e.key ==='Enter'){
        let addValue = enterItem.value.trim();
        if( addValue !==''){
          items.push(addValue)
          this.renderCircle()
          this.showArray()
          this.animate(0, 1)
          enterItem.value = ''
        }
      }
    }
    add.onclick = () => {
      let addValue = enterItem.value.trim();
      if( addValue !==''){
        items.push(addValue)
        this.renderCircle()
        this.showArray()
        this.animate(0, 1)
        enterItem.value = ''
      }
      
    }
  },
  delItem: function(delbtn){
    for (let i =0; i< delbtn.length; i++){
      delbtn = document.querySelectorAll('.delete-item');
      delbtn[i].onclick = () => {
        items.splice(i,1)
        this.showArray()
        this.renderCircle()
        this.animate(0, 1)
      }
    }
  },
  start: function() {
    this.renderCircle();
    this.rollAnimate();
    this.showArray();
    this.addItem()
  }
}
app.start()
