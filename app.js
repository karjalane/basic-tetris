

document.addEventListener('DOMContentLoaded', () => {
  // const grid = document.querySelector('.grid')

  // const N_OF_DIVS = 200

  // const setupDivs = () => {
  //   let nr = 0
  //   while (nr < N_OF_DIVS) {
  //     let div = document.createElement('div')
  //     div.innerHTML = ''
  //     grid.appendChild(div)
  //     nr++
  //   }
  // }

  let squares = Array.from(document.querySelectorAll('.grid div'))

  // window.addEventListener('DOMContentLoaded', setupDivs)
  
  const width = 10
  const ScoreDisplay = document.querySelector('#score')
  const StartBtn = document.querySelector('#start-btn')

  // the tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2]
    ,[width, width + 1, width + 2, width * 2 + 2]
    ,[1, width + 1, width * 2 + 1, width * 2]
    ,[width, width * 2, width * 2 + 1, width * 2 + 2]
  ]

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1]
    ,[width + 1, width + 2, width * 2, width * 2 + 1]
    ,[0, width, width + 1, width * 2 + 1]
    ,[width + 1, width + 2, width * 2, width * 2 + 1]
  ]

  const tTetromino = [
    [1, width, width + 1, width + 2]
    ,[1, width + 1, width + 2, width * 2 + 1]
    ,[width, width + 1, width + 2, width * 2 + 1]
    ,[1, width, width + 1, width * 2 + 1]
  ]

  const oTetromino = [
    [0, 1, width, width + 1]
    ,[0, 1, width, width + 1]
    ,[0, 1, width, width + 1]
    ,[0, 1, width, width + 1]
  ]

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1]
    ,[width, width + 1, width + 2, width + 3]
    ,[1, width + 1, width * 2 + 1, width * 3 + 1]
    ,[width, width + 1, width + 2, width + 3]
  ]

  const theTetrominoes = [
    lTetromino
    , zTetromino
    , iTetromino
    , oTetromino
    , iTetromino
  ]

  let currentPos = 4
  let currentRotation = 0
  
  // randomly select tetromino and first rotation
  let random = Math.floor(Math.random() * theTetrominoes.length)
  let current = theTetrominoes[random][0]

  console.log(squares)

  // draw the tetromino
  const draw = () => {
    current.forEach(i => {
      squares[currentPos + i].classList.add('tetromino')
    })
  }

  // undraw the tetromino
  const undraw = () => {
    current.forEach(i => {
      squares[currentPos + i].classList.remove('tetromino')
    })
  }
})