document.addEventListener("DOMContentLoaded", () => {
  const flexBox = document.getElementById("flexBox");
  const squares = Array.from(document.querySelectorAll("#flexBox div"));

  const scoreDisplay = document.getElementById("score");
  const startBtn = document.getElementById("start-btn");
  let width = 10;

  //each tetris piece shape
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

  const Tpiece=[
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
  ]
  const Opiece = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];
  const Ipiece = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  let pieces = [Lpiece, Zpiece, Opiece, Ipiece, Tpiece];

  let currentPosition = 4;

  let randomPuzzle = Math.floor(Math.random() * pieces.length);
  let randomOrder = Math.floor(Math.random() * 4);
  let puzzle = pieces[randomPuzzle][randomOrder];

  function draw() {
    puzzle.forEach((index) => {
      squares[currentPosition + index].classList.add("piece");

    });
  }
  function nextdraw(){
    width=4

    
    puzzle.forEach((index) => {
      miniSquares[index].classList.add("piece");

    });
    console.log(puzzle)
  }
  function undraw() {
    puzzle.forEach((index) => {
      squares[currentPosition + index].classList.remove("piece");
    });
  }

  draw();
  randomPuzzle = Math.floor(Math.random() * pieces.length)
  randomOrder = Math.floor(Math.random() * 4)
  nextdraw();

  function freeze() {
    if (
      puzzle.some((index) =>
        squares[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      puzzle.forEach((index) =>
        squares[currentPosition + index].classList.add("taken")
      );
      //start a new piece falling, need to insert randomPuzzle, randomOrder and puzzle again so the variable will activate again and randomize the piece
      // randomPuzzle = Math.floor(Math.random() * pieces.length)
      // randomOrder = Math.floor(Math.random() * 4)
      puzzle = pieces[randomPuzzle][randomOrder]
      currentPosition = 4;
      draw();
    }
  }

  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }



  timerId = setInterval(moveDown, 1000);






  // startBtn.addEventListener("click", () => {});

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      const isAtLeftEdge = puzzle.some(index=>(currentPosition+index)%width===0) 

      undraw();
      //the line below shows that the piece only move if the puzzle is not at the left edge, if the puzzle is at left edge, the current position stayed constant (but the code didn't state it explicitly)
      if(!isAtLeftEdge){currentPosition-=1}
      if(puzzle.some(index=>squares[currentPosition+index].classList.contains('taken'))){currentPosition+=1}

      draw();
    }
    else if(event.key==="ArrowUp"){
      if(randomOrder>=3){
        randomOrder=-1 
    }
    undraw()
    randomOrder+=1
    puzzle = pieces[randomPuzzle][randomOrder]
    draw()
    }
    if (event.key === "ArrowRight") {
      const isAtRightEdge = puzzle.some(index=>(currentPosition+index)%width===9) 
      undraw();
      if(!isAtRightEdge){currentPosition+=1}
      if(puzzle.some(index=>squares[currentPosition+index].classList.contains('taken'))){currentPosition-=1}

      draw();
    }
    if (event.key === "ArrowDown") {
      undraw();
      currentPosition += 20;

      draw();
      freeze();
    }
  });


const miniSquares = Array.from(document.querySelectorAll("#mini-flexBox div"));
const miniWidth=4
let displayIndex=0
const nextPiece=[
  [1, width + 1, width * 2 + 1, 2], //Lpiece
  [0, width, width + 1, width * 2 + 1], //Zpiece
  [1, width, width+1, width+2] //Tpiece
  [0, 1, width, width + 1], //Opiece
  [1, width + 1, width * 2 + 1, width * 3 + 1] //Ipiece
]

function displayNext(){
  miniSquares.forEach(squares=>{
    squares.classList.remove('piece')
  })
  nextPiece()

}




});
