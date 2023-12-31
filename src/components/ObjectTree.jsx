import React from 'react'
import data from '../data/data.json'
import AssetMultiple from './AssetMultiple'
import assetTree from '../assets/Basic Grass Biome things 1.png'

function ObjectTree({ treeState }) {
  let treeDataTop
  let treeDataBottom

  if (treeState === 0) {
    treeDataTop = data.treeTop0.tile
    treeDataBottom = data.treeBottom0.tile
  }
  if (treeState === 1) {
    treeDataTop = data.treeTop1.tile
    treeDataBottom = data.treeBottom1.tile
  }
  if (treeState === 2) {
    treeDataTop = data.treeTop2.tile
    treeDataBottom = data.treeBottom2.tile
  }
  if (treeState === 3) {
    treeDataTop = data.treeTop3.tile
    treeDataBottom = data.treeBottom3.tile
  }

  return (
    <>
      <AssetMultiple asset={assetTree} position={data.treeTop.position} tile={treeDataTop} zIndex={1} />
      <AssetMultiple asset={assetTree} position={data.treeBottom.position} tile={treeDataBottom} zIndex={-1} />
    </>
  )
}

export default ObjectTree