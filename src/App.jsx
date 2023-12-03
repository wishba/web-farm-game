import './App.css'
import { useEffect, useRef, useState } from 'react'
import assetHero from './assets/Basic Character Sprite sheet.png'
import assetGround from './assets/Grass.png'
import assetButton from './assets/Sprite sheet for Basic Pack.png'
import assetWalkingSound from './assets/Bubble heavy 1.wav'
import assetCollectSound from './assets/Fruit collect 1.wav'
import data from './data/data.json'
import Guide from './components/Guide'
import Asset from './components/Asset'
import AssetMultiple from './components/AssetMultiple'
import ObjectTree from './components/ObjectTree'

function App() {
  const [isDebugging, setIsDebugging] = useState(false)
  const [coordinate, setCoordinate] = useState([0, 0])
  const [facing, setFacing] = useState('down')
  const [inventory, setInventory] = useState(parseInt(localStorage.getItem('fruit')) || 0)
  const [treeState, setTreeState] = useState(3)
  const [heroDirection, setHeroDirection] = useState([1, 1])
  const [counter, setCounter] = useState(0)
  const [isHoldUp, setIsHoldUp] = useState(false)
  const [isHoldLeft, setIsHoldLeft] = useState(false)
  const [isHoldRight, setIsHoldRight] = useState(false)
  const [isHoldDown, setIsHoldDown] = useState(false)
  const [isHoldA, setIsHoldA] = useState(false)
  const [isHoldB, setIsHoldB] = useState(false)

  const walkingRef = useRef()
  const counterRef = useRef()

  const fruitGenerateSpeed = 3000
  const movementSpeed = 15
  const delayTime = 300
  const coordinateTile = [Math.round(coordinate[0] / 80), Math.round(coordinate[1] / 80)]
  const soundWalking = () => new Audio(assetWalkingSound).play()
  const soundCollect = () => new Audio(assetCollectSound).play()
  const buttonFeedback = (condition) => (
    <Asset asset={assetButton} position={[0, 0]} tile={condition ? [18, 4] : [17, 4]} />
  )

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === '`') {
        setIsDebugging((prev) => !prev)
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
      if (treeState < 3) {
        setTreeState((prevTreeState) => prevTreeState + 1)
      }
    }, fruitGenerateSpeed);

    return () => clearInterval(intervalId)
  }, [treeState])

  const startWalking = (direction) => {
    setCounter(4)
    counterRef.current = setInterval(() => {
      setCounter((prevCount) => (prevCount === 4 ? 1 : prevCount + 1))
      soundWalking()
    }, delayTime);

    walkingRef.current = setInterval(() => {
      setCoordinate(prevCoordinate => {
        switch (direction) {
          case 'right':
            setFacing('right')
            return [prevCoordinate[0] + 1, prevCoordinate[1]]
          case 'left':
            setFacing('left')
            return [prevCoordinate[0] - 1, prevCoordinate[1]]
          case 'down':
            setFacing('down')
            return [prevCoordinate[0], prevCoordinate[1] + 1]
          case 'up':
            setFacing('up')
            return [prevCoordinate[0], prevCoordinate[1] - 1]
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
  }

  const handleClickA = () => {
    for (const treeFruit of data.treeFruit.position) {
      if (
        treeFruit[0] === coordinateTile[0] &&
        treeFruit[1] === coordinateTile[1] &&
        treeState > 0
      ) {
        setInventory(inventory + 1)
        localStorage.setItem('fruit', inventory + 1)
        setTreeState(treeState - 1)
        soundCollect()
      }
    }
  }

  return (
    <div className='app'>
      <div className='app__status'>
        {isDebugging && (
          <p>
            [{coordinate[0]}/{coordinate[1]}]
            [{coordinateTile[0]}/{coordinateTile[1]}]
            [{facing}/{counter}]
            <hr />
          </p>
        )}

        <div>
          <p>inventory</p>
          <p>fruit: {inventory}</p>
        </div>
      </div>

      <div className='app__button--movement'>
        <div className='app__button app__button--up'>
          {buttonFeedback(isHoldUp)}
          <button className='app__button--indicator app__arrow--up'
            onMouseDown={() => {
              startWalking('up')
              setIsHoldUp(true)
            }}
            onMouseUp={() => {
              stopWalking()
              setIsHoldUp(false)
            }}
            onMouseLeave={() => {
              stopWalking()
              setIsHoldUp(false)
            }}
            onTouchStart={() => {
              startWalking('up')
              setIsHoldUp(true)
            }}
            onTouchEnd={() => {
              stopWalking()
              setIsHoldUp(false)
            }}
          >&uarr;</button>
        </div>

        <div className='app__button app__button--left'>
          {buttonFeedback(isHoldLeft)}
          <button className='app__button--indicator app__arrow--left'
            onMouseDown={() => {
              startWalking('left')
              setIsHoldLeft(true)
            }}
            onMouseUp={() => {
              stopWalking()
              setIsHoldLeft(false)
            }}
            onMouseLeave={() => {
              stopWalking()
              setIsHoldLeft(false)
            }}
            onTouchStart={() => {
              startWalking('left')
              setIsHoldLeft(true)
            }}
            onTouchEnd={() => {
              stopWalking()
              setIsHoldLeft(false)
            }}
          >&uarr;</button>
        </div>

        <div className='app__button app__button--right'>
          {buttonFeedback(isHoldRight)}
          <button className='app__button--indicator app__arrow--right'
            onMouseDown={() => {
              startWalking('right')
              setIsHoldRight(true)
            }}
            onMouseUp={() => {
              stopWalking()
              setIsHoldRight(false)
            }}
            onMouseLeave={() => {
              stopWalking()
              setIsHoldRight(false)
            }}
            onTouchStart={() => {
              startWalking('right')
              setIsHoldRight(true)
            }}
            onTouchEnd={() => {
              stopWalking()
              setIsHoldRight(false)
            }}
          >&uarr;</button>
        </div>

        <div className='app__button app__button--down'>
          {buttonFeedback(isHoldDown)}
          <button className='app__button--indicator app__arrow--down'
            onMouseDown={() => {
              startWalking('down')
              setIsHoldDown(true)
            }}
            onMouseUp={() => {
              stopWalking()
              setIsHoldDown(false)
            }}
            onMouseLeave={() => {
              stopWalking()
              setIsHoldDown(false)
            }}
            onTouchStart={() => {
              startWalking('down')
              setIsHoldDown(true)
            }}
            onTouchEnd={() => {
              stopWalking()
              setIsHoldDown(false)
            }}
          >&uarr;</button>
        </div>
      </div>

      <div className='app__button--action'>
        <div className='app__button app__button--a'>
          {buttonFeedback(isHoldA)}
          <button className='app__button--indicator'
            onMouseDown={() => {
              handleClickA()
              setIsHoldA(true)
            }}
            onMouseUp={() => {
              setIsHoldA(false)
            }}
            onMouseLeave={() => {
              setIsHoldA(false)
            }}
            onTouchStart={() => {
              handleClickA()
              setIsHoldA(true)
            }}
            onTouchEnd={() => {
              setIsHoldA(false)
            }}
          >a</button>
        </div>

        <div className='app__button app__button--b'>
          {buttonFeedback(isHoldB)}
          <button className='app__button--indicator'
            onMouseDown={() => {
              handleClickA()
              setIsHoldB(true)
            }}
            onMouseUp={() => {
              setIsHoldB(false)
            }}
            onMouseLeave={() => {
              setIsHoldB(false)
            }}
            onTouchStart={() => {
              handleClickA()
              setIsHoldB(true)
            }}
            onTouchEnd={() => {
              setIsHoldB(false)
            }}
          >b</button>
        </div>
      </div>

      <div style={{
        width: '100vw',
        height: '100vh',
        transform: `translate(
          calc(50% - (var(--tile-size) / 2) + ${coordinate[0] * -1}px), 
          calc(50% - (var(--tile-size) / 2) + ${coordinate[1] * -1}px)
        )`,
      }}>
        {isDebugging && (
          <div>
            <Guide tileDimension={[7, 9]} />
            <AssetMultiple asset={''} position={data.wall.position} tile={data.wall.tile} />
          </div>
        )}

        <div style={{
          position: 'absolute',
          zIndex: '0',
          transform: `translate(
            ${coordinate[0]}px, 
            calc(${coordinate[1]}px - (var(--tile-size) / 2))
          )`,
        }}>
          <Asset asset={assetHero} position={[0, 0]} tile={heroDirection} />
          {isDebugging && (
            <div className='app__debug--hero'></div>
          )}
        </div>

        <AssetMultiple asset={assetGround} position={data.ground.position} tile={data.ground.tile} zIndex={-99} />
        <ObjectTree treeState={treeState} />
      </div>
    </div>
  )
}

export default App
