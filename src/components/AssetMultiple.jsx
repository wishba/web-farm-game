import React from 'react'
import Asset from './Asset'

function AssetMultiple({ asset, position, tile, zIndex }) {
  const assetArray = []

  for (let index = 0; index < position.length; index++) {
    assetArray.push(
      <Asset key={index} asset={asset} position={position[index]} tile={tile.length == 0 ? [0, 0] : tile[index]} />
    )
  }

  return (
    <div style={{
      position: 'absolute',
      zIndex: `${zIndex}`,
    }}>{assetArray}</div>
  )
}

export default AssetMultiple