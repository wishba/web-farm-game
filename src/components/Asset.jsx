import React, { useRef, useState } from 'react'
import './Asset.css'
import assetHero from '../assets/Basic Character Sprite sheet.png'

function Asset() {
  const assetRef = useRef()
  const [assetWidth, setAssetWidth] = useState()
  const position = [0, 0]
  const tile = [-1, -1]

  return (
    <div className='asset' style={{
      transform: `translate(calc(${position[0]} * var(--tile-size)), calc(${position[1]} * var(--tile-size)))`,
    }}>
      <img
        onLoad={() => {
          setAssetWidth(assetRef.current.offsetWidth)
        }}
        ref={assetRef}
        style={{
          width: `calc(${assetWidth}px * var(--zoom-level))`,
          transform: `translate(calc(${tile[0]} * var(--tile-size)), calc(${tile[1]} * var(--tile-size)))`,
        }}
        src={assetHero}
        alt="assetHero"
      />
    </div>
  )
}

export default Asset