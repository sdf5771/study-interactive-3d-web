import { Routes, Route } from 'react-router-dom'
import { Home, Camera } from './routes'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/camera" element={<Camera />} />
    </Routes>
  )
}

export default App
