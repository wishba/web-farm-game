import './App.css'
import { useEffect, useRef, useState } from 'react'
import data from './data/data.js'
import assetButton from './assets/Sprite sheet for Basic Pack.png'
import assetWalkingSound from './assets/Bubble heavy 1.wav'
import assetCollectSound from './assets/Fruit collect 1.wav'
import Asset from './components/Asset'
import ObjectTree from './components/ObjectTree'
import ObjectGuide from './components/ObjectGuide.jsx'
import ObjectGround from './components/ObjectGround.jsx'
import ObjectHero from './components/ObjectHero.jsx'

function App() {
  const [isDebugging, setIsDebugging] = useState(false)
  const [coordinate, setCoordinate] = useState([0, 0])
  const [facing, setFacing] = useState('down')
  const [inventory, setInventory] = useState(parseInt(localStorage.getItem('fruit')) || 0)
  const [statusTree, setStatusTree] = useState(3)
  const [heroDirection, setHeroDirection] = useState([1, 1])
  const [counter, setCounter] = useState(0)
  const [buttonHold, setButtonHold] = useState('')

  const walkingRef = useRef()
  const counterRef = useRef()

  const fruitGenerateSpeed = 3000
  const movementSpeed = 15
  const delayTime = 300
  const coordinateTile = [Math.round(coordinate[0] / 80), Math.round(coordinate[1] / 80)]
  const soundWalking = () => new Audio(assetWalkingSound).play()
  const soundCollect = () => new Audio(assetCollectSound).play()

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === '`') {
        setIsDebugging((prevIsDebugging) => !prevIsDebugging)
      }
    }
    window.addEventListener('keydown', handleKeyPress)

    const handlePreventDefault = (e) => {
      e.preventDefault()
    }
    document.addEventListener('contextmenu', handlePreventDefault)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      document.removeEventListener('contextmenu', handlePreventDefault)
    }
  }, [])

  useEffect(() => {
    for (const wall of data.wall.position) {
      if (wall[0] === coordinateTile[0] && wall[1] === coordinateTile[1]) {
        setCoordinate(prevCoordinate => {
          switch (facing) {
            case 'right':
              return [prevCoordinate[0] - 1, prevCoordinate[1]]
            case 'left':
              return [prevCoordinate[0] + 1, prevCoordinate[1]]
            case 'down':
              return [prevCoordinate[0], prevCoordinate[1] - 1]
            case 'up':
              return [prevCoordinate[0], prevCoordinate[1] + 1]
            default:
              break;
          }
        })
      }
    }
  }, [coordinate])

  useEffect(() => {
    const countFacing = {
      'down': [[1, 1], [7, 1], [4, 1], [10, 1], [4, 1]],
      'up': [[1, 4], [7, 4], [4, 4], [10, 4], [4, 4]],
      'left': [[1, 7], [7, 7], [4, 7], [10, 7], [4, 7]],
      'right': [[1, 10], [7, 10], [4, 10], [10, 10], [4, 10]]
    }

    if (counter === 0) {
      setTimeout(() => {
        setHeroDirection(countFacing[facing][0])
        soundWalking()
      }, delayTime);
    } else {
      setHeroDirection(countFacing[facing][counter])
    }
  }, [facing, counter])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (statusTree < 3) {
        setStatusTree((prevStatusTree) => prevStatusTree + 1)
      }
    }, fruitGenerateSpeed);

    return () => clearInterval(intervalId)
  }, [statusTree])

  const startWalking = (direction) => {
    setCounter(4)
    counterRef.current = setInterval(() => {
      setCounter((prevCount) => (prevCount === 4 ? 1 : prevCount + 1))
      soundWalking()
    }, delayTime);

    walkingRef.current = setInterval(() => {
      setCoordinate(prevCoordinate => {
        switch (direction) {
          case 'up':
            setFacing('up')
            setButtonHold('up')
            return [prevCoordinate[0], prevCoordinate[1] - 1]
          case 'left':
            setFacing('left')
            setButtonHold('left')
            return [prevCoordinate[0] - 1, prevCoordinate[1]]
          case 'right':
            setFacing('right')
            setButtonHold('right')
            return [prevCoordinate[0] + 1, prevCoordinate[1]]
          case 'down':
            setFacing('down')
            setButtonHold('down')
            return [prevCoordinate[0], prevCoordinate[1] + 1]
          default:
            break;
        }
      })
    }, movementSpeed)
  }

  const stopWalking = () => {
    clearInterval(walkingRef.current)
    clearInterval(counterRef.current)
    setCounter(0)
    setButtonHold('')
  }

  const startAction = (action) => {
    switch (action) {
      case 'a':
        setButtonHold('a')
        break;
      case 'b':
        setButtonHold('b')
        break;
      default:
        break;
    }

    for (const treeFruit of data.treeFruit.position) {
      if (
        treeFruit[0] === coordinateTile[0] &&
        treeFruit[1] === coordinateTile[1] &&
        statusTree > 0
      ) {
        setInventory(inventory + 1)
        localStorage.setItem('fruit', inventory + 1)
        setStatusTree(statusTree - 1)
        soundCollect()
      }
    }
  }

  const stopAction = () => {
    setButtonHold('')
  }

  const handleButton = (props) => {
    const start = () => (props === 'a' || props === 'b') ? startAction(props) : startWalking(props)
    const stop = () => (props === 'a' || props === 'b') ? stopAction() : stopWalking()

    return (
      <div className={`app__button app__button--${props}`}>
        <Asset asset={assetButton} position={[0, 0]} tile={buttonHold === props ? [18, 4] : [17, 4]} />
        <button className={`app__button--indicator app__arrow--${props}`}
          style={{ opacity: `${isDebugging ? '50%' : '0'}` }}
          onMouseDown={start}
          onTouchStart={start}
          onMouseUp={stop}
          onMouseLeave={stop}
          onTouchEnd={stop}
        >
          {props !== 'a' && props !== 'b' ? <>&uarr;</> : props}
        </button>
      </div>
    )
  }

  return (
    <div className='app'>
      <div className='app__status'>
        {isDebugging &&
          <p>
            [{coordinate[0]}/{coordinate[1]}]
            [{coordinateTile[0]}/{coordinateTile[1]}]
            [{facing}/{counter}]
          </p>
        }
        <p>inventory</p>
        <p>fruit: {inventory}</p>
      </div>

      <div className='app__button--movement'>
        {handleButton('up')}
        {handleButton('left')}
        {handleButton('right')}
        {handleButton('down')}
      </div>

      <div className='app__button--action'>
        {handleButton('a')}
        {handleButton('b')}
      </div>

      <div style={{
        width: '100vw',
        height: '100vh',
        transform: `translate(
          calc(50% - (var(--tile-size) / 2) + ${coordinate[0] * -1}px), 
          calc(50% - (var(--tile-size) / 2) + ${coordinate[1] * -1}px)
        )`,
      }}>
        {isDebugging && <ObjectGuide />}
        <ObjectGround />
        <ObjectTree status={statusTree} />
        <ObjectHero coordinate={coordinate} heroDirection={heroDirection} isDebugging={isDebugging} />
      </div>
    </div>
  )
}

export default App
