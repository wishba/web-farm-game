import './App.css'
import Guide from './components/Guide'
import Asset from './components/Asset'
import assetHero from './assets/Basic Character Sprite sheet.png'
import assetTree from './assets/Basic Grass Biome things 1.png'
import AssetMultiple from './components/AssetMultiple'

function App() {
  return (
    <div className='app'>
      <div className='app--center'>
        <Asset asset={assetHero} position={[0, 0]} tile={[1, 1]} />
        <AssetMultiple asset={assetTree} />
        <Guide />
      </div>
    </div>
  )
}

export default App
