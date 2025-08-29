import { Routes, Route } from 'react-router-dom'
import { Home, Camera, Gsap } from './routes'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/gsap" element={<Gsap />} />
    </Routes>
  )
}

export default App
