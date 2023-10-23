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
  const [coordinate, setCoordinate] = useState([0, 0])
  const walkingRef = useRef()
  const [facing, setFacing] = useState('down')

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
    }, 20)
  }

  const stopWalking = () => {
    clearInterval(walkingRef.current)
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

  return (
    <div className='app'>
      <div className='app__guide'>
        {coordinate[0]}/{coordinate[1]}|
        {coordinateTile[0]}/{coordinateTile[1]}|
        {facing}
      </div>

      <div style={{
        width: '100vw',
        height: '100vh',
        transform: `translate(
          calc(50% - (var(--tile-size) / 2) + ${coordinate[0] * -1}px), 
          calc(50% - (var(--tile-size) / 2) + ${coordinate[1] * -1}px)
        )`,
      }}>
        <AssetMultiple asset={assetGround} position={data.ground.position} tile={data.ground.tile} />
        <AssetMultiple asset={assetTree} position={data.tree.position} tile={data.tree.tile} />
        <Guide tileDimension={[7, 9]} />
        <div className='app__wall'>
          <AssetMultiple asset={assetHero} position={data.wall.position} tile={data.wall.tile} />
        </div>
      </div>

      <div className='app__hero'>
        <Asset asset={assetHero} position={[0, 0]} tile={[1, 1]} />
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
      </div>
    </div>
  )
}

export default App
