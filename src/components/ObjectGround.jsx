import React from 'react'
import data from '../data/data'
import assetGround from '../assets/Grass.png'
import AssetMultiple from './AssetMultiple'

function ObjectGround() {
  return (
    <AssetMultiple asset={assetGround} position={data.ground.position} tile={data.ground.tile} zIndex={-99} />
  )
}

export default ObjectGround