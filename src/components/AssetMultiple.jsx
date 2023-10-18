import React from 'react'
import Asset from './Asset'

function AssetMultiple({ asset }) {
  const position = [
    [1, 0], [2, 0],
    [1, 1], [2, 1]
  ]
  const tile = [
    [3, 0], [4, 0],
    [3, 1], [4, 1]
  ]
  const assetArray = []

  for (let index = 0; index < position.length; index++) {
    assetArray.push(
      <Asset key={index} asset={asset} position={position[index]} tile={tile[index]} />
    )
  }

  return (
    <div>
      {assetArray}
    </div>
  )
}

export default AssetMultiple