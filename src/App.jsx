import './App.css'
import Guide from './components/Guide'
import Asset from './components/Asset'

function App() {
  return (
    <div className='app'>
      <div className='app--center'>
        <Asset />
        <Guide />
      </div>
    </div>
  )
}

export default App
