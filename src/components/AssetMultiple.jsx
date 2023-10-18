import React from 'react'
import Asset from './Asset'

function AssetMultiple({ asset, position, tile }) {
  const assetArray = []

  for (let index = 0; index < position.length; index++) {
    assetArray.push(
      <Asset key={index} asset={asset} position={position[index]} tile={tile[index]} />
    )
  }

  return (
    <div>{assetArray}</div>
  )
}

export default AssetMultiple