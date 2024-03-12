import React from 'react'
import assetHero from '../assets/Basic Character Sprite sheet.png'
import Asset from './Asset'

function ObjectHero({ coordinate, heroDirection, isDebugging }) {
  return (
    <div style={{
      position: 'absolute',
      zIndex: '0',
      transform: `translate(
        ${coordinate[0]}px, 
        calc(${coordinate[1]}px - (var(--tile-size) / 2))
      )`,
    }}>
      <Asset asset={assetHero} position={[0, 0]} tile={heroDirection} />
      {isDebugging && <div className='app__debug--hero'></div>}
    </div>
  )
}

export default ObjectHero