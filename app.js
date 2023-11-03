document.addEventListener("DOMContentLoaded", () => {
  const flexBox = document.getElementById("flexBox");
  let squares = Array.from(document.querySelectorAll("#flexBox div"));

  const scoreDisplay = document.getElementById("score");
  const startBtn = document.getElementById("start-btn");
  let width = 10;
  let timerId;
  let score = 0;
const colors=[

'orange',
'red',
'purple',
'green',
'blue'


]
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

  const Tpiece = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];
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

  let pieces = [Lpiece, Zpiece, Tpiece, Opiece, Ipiece];

  let currentPosition = 4;

  let randomPuzzle = Math.floor(Math.random() * pieces.length);
  let randomOrder = Math.floor(Math.random() * 4);
  let puzzle = pieces[randomPuzzle][randomOrder];

  function draw() {
    puzzle.forEach((index) => {
      squares[currentPosition + index].classList.add("piece");
      squares[currentPosition+index].style.backgroundColor=colors[randomPuzzle]
    });
  }

  function undraw() {
    puzzle.forEach((index) => {
      squares[currentPosition + index].classList.remove("piece");
      squares[currentPosition+index].style.backgroundColor=''

    });
  }

  // draw();
  // randomPuzzle = Math.floor(Math.random() * pieces.length);
  // randomOrder = Math.floor(Math.random() * 4);

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
      randomPuzzle = nextRandomPuzzle;
      randomOrder = nextRandomOrder;
      nextRandomPuzzle = Math.floor(Math.random() * pieces.length);
      nextRandomOrder = Math.floor(Math.random() * 4);
      puzzle = pieces[randomPuzzle][randomOrder];

      currentPosition = 4;
      draw();
      displayNext();
      addScore();
      gameOver();
    }
  }

  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  startBtn.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, 1000);
      ;

      if (
        foreseeSquares.some((square) => {
         return square.classList.contains("piece");
        })
      ) {}else{
        nextRandomPuzzle = Math.floor(Math.random() * pieces.length);
        nextRandomOrder = Math.floor(Math.random() * 4);
        displayNext()
      } 

    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key ===' '){
      console.log('fay')
    }
    else if (event.key === "ArrowLeft") {
      const isAtLeftEdge = puzzle.some(
        (index) => (currentPosition + index) % width === 0
      );

      undraw();
      //the line below shows that the piece only move if the puzzle is not at the left edge, if the puzzle is at left edge, the current position stayed constant (but the code didn't state it explicitly)
      if (!isAtLeftEdge) {
        currentPosition -= 1;
      }
      if (
        puzzle.some((index) =>
          squares[currentPosition + index].classList.contains("taken")
        )
      ) {
        currentPosition += 1;
      }

      draw();
    } else if (event.key === "ArrowUp") {
      if (randomOrder >= 3) {
        randomOrder = -1;
      }
      undraw();
      randomOrder += 1;
      puzzle = pieces[randomPuzzle][randomOrder];

      draw();
    }
    if (event.key === "ArrowRight") {
      const isAtRightEdge = puzzle.some(
        (index) => (currentPosition + index) % width === 9
      );
      undraw();
      if (!isAtRightEdge) {
        currentPosition += 1;
      }
      if (
        puzzle.some((index) =>
          squares[currentPosition + index].classList.contains("taken")
        )
      ) {
        currentPosition -= 1;
      }

      draw();
    }
    if (event.key === "ArrowDown") {
      undraw();
      currentPosition += 20;

      draw();
      freeze();
    }
  });

  const foreseeSquares = Array.from(
    document.querySelectorAll("#foresee-box div")
  );
  const miniWidth = 4;
  let displayIndex = 0;
  let nextRandomPuzzle = 0;
  let nextRandomOrder = 0;

  //each tetris piece shape shown in the prediction
  const nextLpiece = [
    [1, miniWidth + 1, miniWidth * 2 + 1, 2],
    [miniWidth, miniWidth + 1, miniWidth + 2, miniWidth * 2 + 2],
    [1, miniWidth + 1, miniWidth * 2 + 1, miniWidth * 2],
    [miniWidth, miniWidth * 2, miniWidth * 2 + 1, miniWidth * 2 + 2],
  ];

  const nextZpiece = [
    [0, miniWidth, miniWidth + 1, miniWidth * 2 + 1],
    [miniWidth + 1, miniWidth + 2, miniWidth * 2, miniWidth * 2 + 1],
    [0, miniWidth, miniWidth + 1, miniWidth * 2 + 1],
    [miniWidth + 1, miniWidth + 2, miniWidth * 2, miniWidth * 2 + 1],
  ];

  const nextTpiece = [
    [1, miniWidth, miniWidth + 1, miniWidth + 2],
    [1, miniWidth + 1, miniWidth + 2, miniWidth * 2 + 1],
    [miniWidth, miniWidth + 1, miniWidth + 2, miniWidth * 2 + 1],
    [1, miniWidth, miniWidth + 1, miniWidth * 2 + 1],
  ];
  const nextOpiece = [
    [0, 1, miniWidth, miniWidth + 1],
    [0, 1, miniWidth, miniWidth + 1],
    [0, 1, miniWidth, miniWidth + 1],
    [0, 1, miniWidth, miniWidth + 1],
  ];
  const nextIpiece = [
    [1, miniWidth + 1, miniWidth * 2 + 1, miniWidth * 3 + 1],
    [miniWidth, miniWidth + 1, miniWidth + 2, miniWidth + 3],
    [1, miniWidth + 1, miniWidth * 2 + 1, miniWidth * 3 + 1],
    [miniWidth, miniWidth + 1, miniWidth + 2, miniWidth + 3],
  ];

  let nextPieces = [nextLpiece, nextZpiece, nextTpiece, nextOpiece, nextIpiece];
  let nextPuzzle = nextPieces[nextRandomPuzzle][nextRandomOrder];
  function displayNext() {
    //remove any square with the piece class
    foreseeSquares.forEach((square) => {
      square.classList.remove("piece");
      square.style.backgroundColor=''
    });
    nextPuzzle = nextPieces[nextRandomPuzzle][nextRandomOrder];

    nextPuzzle.forEach((index) => {
      foreseeSquares[displayIndex + index].classList.add("piece");
      foreseeSquares[displayIndex+index].style.backgroundColor=colors[nextRandomPuzzle]
    });
  }

  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];

      if (row.every((index) => squares[index].classList.contains("taken"))) {
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          squares[index].classList.remove("taken");
          squares[index].classList.remove("piece");
        });
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => flexBox.appendChild(cell));
      }
    }
  }

  function gameOver() {
    if (
      puzzle.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      scoreDisplay.innerHTML = "END";
      clearInterval(timerId);
    }
  }
});
