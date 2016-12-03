
let rows = 100;
let columns = 100;
let msInterval = 200;
let boardArray = [];

generateBoardArray();
drawBoard();

function play() {

  document.getElementById("play").disabled = true;

  setInterval(function () {
    calculateStatusBoxes();
    drawBoard();
  }, msInterval)

}

function generateBoardArray() {
  for (r = 0; r < rows; r++) {
    boardArray[r] = [];
  }
}

function drawBoard() {

  let boardElement = document.getElementById("board");
  boardElement.innerHTML = '';

  for (r = 0; r < rows; r++) {

    for (c = 0; c < columns; c++) {

      let state = typeof boardArray[r][c] != "undefined" ? boardArray[r][c] : -1;

      let box = document.createElement("DIV");

      box.row = r;
      box.column = c;

      if (state == 0) { box.className = "dead" };
      if (state == 1) { box.className = "live" };
      if (c == 0) { box.className += " first" }

      box.addEventListener("click", function () {
        let r = box.row;
        let c = box.column;
        giveLifeBox(r, c)
      })

      boardElement.appendChild(box);

    }

  }

}

function calculateStatusBoxes() {

  let _boardArray = copyBoard(boardArray)

  for (r = 0; r < rows; r++) {

    for (c = 0; c < columns; c++) {

      if (r > 0 && c > 0 && r < rows - 1 && c < columns - 1) {

        let statusBox = typeof boardArray[r][c] != "undefined" ? boardArray[r][c] : 0;
        let n = calculateNBox(r, c, statusBox);

        if (statusBox == 0) {
          if (n == 3) {
            _boardArray[r][c] = 1;
          }
        } else {
          if (n < 2 || n > 3) {
            _boardArray[r][c] = 0;
          }
        }

      }

    }

  }

  boardArray = copyBoard(_boardArray)

}

function calculateNBox(r, c, statusBox) {

  let n = 0;

  for (_r = r - 1; _r <= r + 1; _r++) {
    for (_c = c - 1; _c <= c + 1; _c++) {
      let status = typeof boardArray[_r][_c] != "undefined" ? boardArray[_r][_c] : 0;
      n = n + status;
    }
  }

  n = n - statusBox;
  return (n);

}

function giveLifeBox(r, c) {
  boardArray[r][c] = 1;
  drawBoard();
}

function copyBoard(original) {
  let copy = [];
  for (var i = 0; i < original.length; i++) {
    copy[i] = original[i].slice();
  }
  return copy;
}

