document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')

  // const N_OF_DIVS = 200

  // const setupDivs = () => {
  //   let nr = 1
  //   while (nr < N_OF_DIVS) {
  //     //let div = document.createElement('div')
  //     //div.innerHTML = ''
  //     grid.append('<div></div>')
  //     nr++
  //    }
  //  }

  let squares = Array.from(document.querySelectorAll('.grid div'))

  // window.addEventListener('DOMContentLoaded', setupDivs)
  
  const width = 10
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-btn')
  let timerId
  let nextRandom = 0
  let score = 0
  const colors = [
    'orange'
    , 'red'
    , 'purple'
    , 'green'
    , 'blue'
  ]

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
  
  const randomTetro = () => {
    return Math.floor(Math.random() * theTetrominoes.length)
  }
  
  // randomly select tetromino and first rotation
  let random = Math.floor(Math.random() * theTetrominoes.length)
  let current = theTetrominoes[random][0]

  console.log(squares)

  // draw the tetromino
  const draw = () => {
    current.forEach(i => {
      squares[currentPos + i].classList.add('tetromino')
      squares[currentPos + i].style.backgroundColor = colors[random]
    })
  }

  // undraw the tetromino
  const undraw = () => {
    current.forEach(i => {
      squares[currentPos + i].classList.remove('tetromino')
      squares[currentPos + i].style.backgroundColor = ''
    })
  }

  // move down
  const moveDown = () => {
    undraw()
    currentPos += width
    draw()
    freeze()
  }

  // tetrominoes falling
  // timerId = setInterval(moveDown, 500)

  // assign keyCodes & functions
  const control = (e) => {
    e.keyCode === 37
      ? moveLeft()
      : e.keyCode === 38
        ? rotate()
        : e.keyCode === 39
         ? moveRight()
         : e.keyCode === 40
          ? moveDown()
          : null
  }
  document.addEventListener('keyup', (e) => {
    e.preventDefault()
    control(e)
  })

  // freeze
  const freeze = () => {
    if(current.some(i => squares[currentPos + i + width].classList.contains('taken'))) {
      current.forEach(i => squares[currentPos + i].classList.add('taken'))
      // start new tet falling
      random = nextRandom
      nextRandom = randomTetro()
      current = theTetrominoes[random][currentRotation]
      currentPos = 4
      draw()
      displayShape()
      addScore()
      gameOver()
    }
  }

  // move left, unless at the end or blocked
  const moveLeft = () => {
    undraw()
    const isAtLeftEdge = current.some(i => (currentPos + i) % width === 0)

    if (!isAtLeftEdge) currentPos -= 1

    if (current.some(i => squares[currentPos + i].classList.contains('taken'))) {
      currentPos += 1
    }
    draw()
  }

  // move right, unless at end or blocked
  const moveRight = () => {
    undraw()
    const isAtRightEdge = current.some(i => (currentPos + i) % width === width - 1)

    if (!isAtRightEdge) currentPos += 1

    if (current.some(i => squares[currentPos + i].classList.contains('taken'))) {
      currentPos -= 1
    }
    draw()
  }

  // check the edges
  const isAtRight = () => {
    return current.some(i => (currentPos + i + 1) % width === 0)
  }

  const isAtLeft = () => {
    return current.some(i => (currentPos + i) % width === 0)
  }

  const checkRotatedPos = (P) => {
    P = P || currentPos         // check if near the side
    if ((P + 1) % width < 4) {  
      if (isAtRight()) {
        currentPos += 1         // return to playfield
        checkRotatedPos(P)      // check again
      }
    } else if (P % width > 5) {
      if (isAtLeft()) {
        currentPos -= 1
        checkRotatedPos(P)
      }
    }
  }

  // rotate
  const rotate = () => {
    undraw()
    currentRotation++

    if (currentRotation === current.length) { // rotate around
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    checkRotatedPos()
    draw()
  }

  // show next 
  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  const displayIndex = 0

  // the Tetrominoes without rotation
  const upNextTetro = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [0, 1, displayWidth, displayWidth+1], //oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
  ]

  // display the shape in display
  const displayShape = () => {
    displaySquares.forEach(s => {
      s.classList.remove('tetromino')
      s.style.backgroundColor = ''
    })
    upNextTetro[nextRandom].forEach(i => {
      displaySquares[displayIndex + i].classList.add('tetromino')
      displaySquares[displayIndex + i].style.backgroundColor = colors[nextRandom]
    })
  }

  // button functionality
  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 500)
      nextRandom = randomTetro()
      displayShape()
    }
  })

  const addScore = () => {
    for (let i = 0; i < 199; i += width) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

      if (row.every(i => squares[i].classList.contains('taken'))) {
        score += 100
        scoreDisplay.innerHTML = score
        row.forEach(i => {
          squares[i].classList.remove('taken')
          squares[i].classList.remove('tetromino')
          squares[i].style.backgroundColor = ''
        })
        const squaresRemoved = squares.splice(i, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

  // game over
  const gameOver = () => {
    if (current.some(i => squares[currentPos + i].classList.contains('taken'))) {
      scoreDisplay.innerHTML = 'END'
      clearInterval(timerId)
    }
  }
})