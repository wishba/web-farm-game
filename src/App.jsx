import { useRef, useState } from 'react'
import './App.css'
import assetHero from './assets/Basic Character Sprite sheet.png'

function App() {
  const assetRef = useRef()
  const [assetWidth, setAssetWidth] = useState()

  return (
    <div className='app'>
      <div className='app--center'>
        <div className='app__image'>
          <img
            onLoad={() => {
              setAssetWidth(assetRef.current.offsetWidth)
            }}
            ref={assetRef}
            style={{
              width: `calc(${assetWidth}px * var(--zoom-level))`,
              transform: `translate(calc(-1 * var(--tile-size)), calc(-1 * var(--tile-size)))`,
            }}
            src={assetHero}
            alt="assetHero"
          />
        </div>
      </div>
    </div>
  )
}

export default App
