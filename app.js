document.addEventListener("DOMContentLoaded", () => {
  const flexBox = document.getElementById("flexBox");
  let squares = Array.from(document.querySelectorAll("#flexBox div"));
  const scoreDisplay = document.getElementById("score");
  const startBtn = document.getElementById("start-btn");
  let width = 10;
  let widthLimit = flexBox.clientWidth
  let heightLimit = flexBox.clientHeight
  console.log(widthLimit)
console.log(heightLimit)
  const Lpiece = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];
  
  const Zpiece = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];
  
  const Opiece = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];
  const Ipiece =[
  [1, width+1, width*2+1, width*3+1],
  [width, width+1, width+2, width+3],
  [1, width+1, width*2+1, width*3+1],
  [width, width+1, width+2, width+3]
  ]
  
  
  const pieces =[Lpiece, Zpiece, Opiece, Ipiece]  
  
  
  let currentPosition =4

  let randomPuzzle = Math.floor(Math.random() * 4)
  let randomOrder = Math.floor(Math.random() * 4)
  let puzzle = pieces[randomPuzzle][randomOrder]
  
  function draw(){
      puzzle.forEach(index =>{
          squares[currentPosition +index].classList.add('piece')
  
      })
  
  
  }
function undraw(){
  puzzle.forEach(index =>{
    squares[currentPosition +index].classList.remove('piece')

})
}

  draw()
timerId = setInterval(moveDown,1000)

function moveDown(){

  
  undraw()
  currentPosition+=width
  draw()
  
  
}



document.addEventListener('keydown', function(event){
  if(event.key==="ArrowLeft"){
    
    undraw()
    currentPosition-=1
    draw()
  }
  // else if(event.key==="ArrowUp"){
  
  // }
  if(event.key==="ArrowRight"){
    undraw()
    currentPosition+=1
    draw()
  }
  if(event.key==="ArrowDown"){
    undraw()
    currentPosition+=20
    draw()
  }
  
  
  
  
  })





});



