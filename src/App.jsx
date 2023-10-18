import './App.css'
import data from './data/data.json'
import Guide from './components/Guide'
import Asset from './components/Asset'
import AssetMultiple from './components/AssetMultiple'
import assetHero from './assets/Basic Character Sprite sheet.png'
import assetTree from './assets/Basic Grass Biome things 1.png'
import assetGround from './assets/Grass.png'

function App() {
  return (
    <div className='app'>
      <div className='app--center'>
        <AssetMultiple asset={assetGround} position={data.ground.position} tile={data.ground.tile} />
        <AssetMultiple asset={assetTree} position={data.tree.position} tile={data.tree.tile} />
        <Asset asset={assetHero} position={[0, 0]} tile={[1, 1]} />
        <Guide />
      </div>
    </div>
  )
}

export default App
