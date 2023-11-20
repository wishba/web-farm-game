import './App.css'
import data from './data/data.json'
import Guide from './components/Guide'
import Asset from './components/Asset'
import AssetMultiple from './components/AssetMultiple'
import assetHero from './assets/Basic Character Sprite sheet.png'
import assetGround from './assets/Grass.png'
import assetButton from './assets/Sprite sheet for Basic Pack.png'
import { useEffect, useRef, useState } from 'react'
import ObjectTree from './components/ObjectTree'

function App() {
  const [isDebugging, setIsDebugging] = useState(false)
  const [coordinate, setCoordinate] = useState([0, 0])
  const [facing, setFacing] = useState('down')
  const [inventory, setInventory] = useState(parseInt(localStorage.getItem('fruit')) || 0)
  const [treeState, setTreeState] = useState(3)
  const [heroDirection, setHeroDirection] = useState([1, 1])
  const [counter, setCounter] = useState(0)

  const walkingRef = useRef()
  const counterRef = useRef()

  const coordinateTile = [Math.round(coordinate[0] / 80), Math.round(coordinate[1] / 80)]
  const styleButton = {
    width: 'var(--tile-size)',
    height: 'var(--tile-size)',
    opacity: isDebugging ? '0.5' : '0',
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
    if (facing === 'down') {
      if (counter === 0) {
        setHeroDirection([4, 1])
      }
      if (counter === 1) {
        setHeroDirection([7, 1])
      }
      if (counter === 2) {
        setHeroDirection([4, 1])
      }
      if (counter === 3) {
        setHeroDirection([10, 1])
      }
    }

    if (facing === 'up') {
      if (counter === 0) {
        setHeroDirection([4, 4])
      }
      if (counter === 1) {
        setHeroDirection([7, 4])
      }
      if (counter === 2) {
        setHeroDirection([4, 4])
      }
      if (counter === 3) {
        setHeroDirection([10, 4])
      }
    }

    if (facing === 'left') {
      if (counter === 0) {
        setHeroDirection([4, 7])
      }
      if (counter === 1) {
        setHeroDirection([7, 7])
      }
      if (counter === 2) {
        setHeroDirection([4, 7])
      }
      if (counter === 3) {
        setHeroDirection([10, 7])
      }
    }

    if (facing === 'right') {
      if (counter === 0) {
        setHeroDirection([4, 10])
      }
      if (counter === 1) {
        setHeroDirection([7, 10])
      }
      if (counter === 2) {
        setHeroDirection([4, 10])
      }
      if (counter === 3) {
        setHeroDirection([10, 10])
      }
    }
  }, [facing, counter])

  useEffect(() => {
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

  const handleStartCounter = () => {
    counterRef.current = setInterval(() => {
      setCounter((prevCount) => (prevCount === 3 ? 0 : prevCount + 1))
    }, 300);
  }

  const startWalking = (direction) => {
    handleStartCounter()
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
      }
    }
  }

  return (
    <div className='app'>
      {isDebugging && (
        <div className='app__debug'>
          {coordinate[0]}/{coordinate[1]}|
          {coordinateTile[0]}/{coordinateTile[1]}|
          {facing}/
          {counter}
        </div>
      )}

      <div className='app__status'>
        <p>inventory</p>
        <p>fruit: {inventory}</p>
      </div>

      <div className='app__button--movement'>
        <div className='app__button app__button--up'>
          <Asset asset={assetButton} position={[0, 0]} tile={[17, 4]} />
          <button
            style={styleButton}
            onMouseDown={() => startWalking('up')}
            onMouseUp={stopWalking}
            onMouseLeave={stopWalking}
            onTouchStart={() => startWalking('up')}
            onTouchEnd={stopWalking}
          >up</button>
        </div>

        <div className='app__button app__button--left'>
          <Asset asset={assetButton} position={[0, 0]} tile={[17, 4]} />
          <button
            style={styleButton}
            onMouseDown={() => startWalking('left')}
            onMouseUp={stopWalking}
            onMouseLeave={stopWalking}
            onTouchStart={() => startWalking('left')}
            onTouchEnd={stopWalking}
          >left</button>
        </div>

        <div className='app__button app__button--right'>
          <Asset asset={assetButton} position={[0, 0]} tile={[17, 4]} />
          <button
            style={styleButton}
            onMouseDown={() => startWalking('right')}
            onMouseUp={stopWalking}
            onMouseLeave={stopWalking}
            onTouchStart={() => startWalking('right')}
            onTouchEnd={stopWalking}
          >right</button>
        </div>

        <div className='app__button app__button--down'>
          <Asset asset={assetButton} position={[0, 0]} tile={[17, 4]} />
          <button
            style={styleButton}
            onMouseDown={() => startWalking('down')}
            onMouseUp={stopWalking}
            onMouseLeave={stopWalking}
            onTouchStart={() => startWalking('down')}
            onTouchEnd={stopWalking}
          >down</button>
        </div>
      </div>

      <div className='app__button--action'>
        <div className='app__button app__button--a'>
          <Asset asset={assetButton} position={[0, 0]} tile={[17, 4]} />
          <button
            style={styleButton}
            onClick={() => handleClickA()}
          >a</button>
        </div>

        <div className='app__button app__button--b'>
          <Asset asset={assetButton} position={[0, 0]} tile={[17, 4]} />
          <button
            style={styleButton}
            onClick={() => handleClickA()}
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
