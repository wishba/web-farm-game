import './App.css'
import data from './data/data.json'
import Guide from './components/Guide'
import Asset from './components/Asset'
import AssetMultiple from './components/AssetMultiple'
import assetHero from './assets/Basic Character Sprite sheet.png'
import assetTree from './assets/Basic Grass Biome things 1.png'
import assetGround from './assets/Grass.png'
import { useEffect, useRef, useState } from 'react'

function App() {
  const [isDebugging, setIsDebugging] = useState(false)
  const [coordinate, setCoordinate] = useState([0, 0])
  const [facing, setFacing] = useState('down')
  const [tes, setTes] = useState()
  const [countTreeTop, setCountTreeTop] = useState(data.treeTop0.tile)
  const [countTreeBottom, setCountTreeBottom] = useState(data.treeBottom0.tile)
  const [isAPressed, setIsAPressed] = useState(false)
  const walkingRef = useRef()
  const coordinateTile = [Math.round(coordinate[0] / 80), Math.round(coordinate[1] / 80)]

  const startWalking = (direction) => {
    walkingRef.current = setInterval(() => {
      setCoordinate(previousCoordinate => {
        switch (direction) {
          case 'right':
            setFacing('right')
            return [previousCoordinate[0] + 1, previousCoordinate[1]]
          case 'left':
            setFacing('left')
            return [previousCoordinate[0] - 1, previousCoordinate[1]]
          case 'down':
            setFacing('down')
            return [previousCoordinate[0], previousCoordinate[1] + 1]
          case 'up':
            setFacing('up')
            return [previousCoordinate[0], previousCoordinate[1] - 1]
        }
      })
    }, 15)
  }

  const stopWalking = () => {
    clearInterval(walkingRef.current)
  }

  const handleStartA = () => {
    setIsAPressed(true)
  }

  const handleStopA = () => {
    setIsAPressed(false)
  }

  useEffect(() => {
    for (const wall of data.wall.position) {
      if (wall[0] === coordinateTile[0] && wall[1] === coordinateTile[1]) {
        setCoordinate(previousCoordinate => {
          switch (facing) {
            case 'right':
              return [previousCoordinate[0] - 1, previousCoordinate[1]]
            case 'left':
              return [previousCoordinate[0] + 1, previousCoordinate[1]]
            case 'down':
              return [previousCoordinate[0], previousCoordinate[1] - 1]
            case 'up':
              return [previousCoordinate[0], previousCoordinate[1] + 1]
          }
        })
      }
    }
  }, [coordinate])

  useEffect(() => {
    for (const treeFruit of data.treeFruit.position) {
      if (
        treeFruit[0] === coordinateTile[0] &&
        treeFruit[1] === coordinateTile[1] &&
        isAPressed === true
      ) {
        if (countTreeTop === data.treeTop0.tile && countTreeBottom === data.treeBottom0.tile) {
          console.log('0');
        }
        if (countTreeTop === data.treeTop1.tile && countTreeBottom === data.treeBottom1.tile) {
          console.log('1');
        }
        if (countTreeTop === data.treeTop2.tile && countTreeBottom === data.treeBottom2.tile) {
          console.log('2');
        }
        if (countTreeTop === data.treeTop3.tile && countTreeBottom === data.treeBottom3.tile) {
          console.log('3');
        }
      }
    }
  }, [coordinate, isAPressed])


  useEffect(() => {
    localStorage.setItem('tesData', 'tesss')
    setTes(localStorage.getItem('tesData'))

    const handleKeyPress = (e) => {
      if (e.key === '`') {
        setIsDebugging((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <div className='app'>
      <p style={{ position: 'absolute' }}>{tes}</p>

      {isDebugging && (
        <div className='app__guide'>
          {coordinate[0]}/{coordinate[1]}|
          {coordinateTile[0]}/{coordinateTile[1]}|
          {facing}
        </div>
      )}

      <div style={{
        width: '100vw',
        height: '100vh',
        transform: `translate(
          calc(50% - (var(--tile-size) / 2) + ${coordinate[0] * -1}px), 
          calc(50% - (var(--tile-size) / 2) + ${coordinate[1] * -1}px)
        )`,
      }}>
        <AssetMultiple asset={assetGround} position={data.ground.position} tile={data.ground.tile} zIndex={-99} />
        <AssetMultiple asset={assetTree} position={data.treeTop.position} tile={countTreeTop} zIndex={1} />
        <AssetMultiple asset={assetTree} position={data.treeBottom.position} tile={countTreeBottom} zIndex={-1} />

        <div style={{
          position: 'absolute',
          zIndex: '0',
          transform: `translate(
            ${coordinate[0]}px, 
            calc(${coordinate[1]}px - (var(--tile-size) / 2))
          )`,
        }}>
          <Asset asset={assetHero} position={[[0, 0]]} tile={[1, 1]} />
          {isDebugging && (
            <div className='app__hero--border'></div>
          )}
        </div>

        {isDebugging && (
          <div>
            <Guide tileDimension={[7, 9]} />
            <AssetMultiple asset={''} position={data.wall.position} tile={data.wall.tile} />
          </div>
        )}
      </div>

      <div className='app__button'>
        <button
          onMouseDown={() => startWalking('up')}
          onMouseUp={stopWalking}
          onMouseLeave={stopWalking}
          onTouchStart={() => startWalking('up')}
          onTouchEnd={stopWalking}
        >up</button>

        <button
          onMouseDown={() => startWalking('left')}
          onMouseUp={stopWalking}
          onMouseLeave={stopWalking}
          onTouchStart={() => startWalking('left')}
          onTouchEnd={stopWalking}
        >left</button>

        <button
          onMouseDown={() => startWalking('right')}
          onMouseUp={stopWalking}
          onMouseLeave={stopWalking}
          onTouchStart={() => startWalking('right')}
          onTouchEnd={stopWalking}
        >right</button>

        <button
          onMouseDown={() => startWalking('down')}
          onMouseUp={stopWalking}
          onMouseLeave={stopWalking}
          onTouchStart={() => startWalking('down')}
          onTouchEnd={stopWalking}
        >down</button>

        <button
          onMouseDown={() => handleStartA()}
          onMouseUp={() => handleStopA()}
          onMouseLeave={() => handleStopA()}
          onTouchStart={() => handleStartA()}
          onTouchEnd={() => handleStopA()}
        >a</button>
      </div>
    </div>
  )
}

export default App
