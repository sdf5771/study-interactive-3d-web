import { Routes, Route } from 'react-router-dom'
import { Home, Camera, Gsap, Utility } from './routes'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/gsap" element={<Gsap />} />
      <Route path="/utility" element={<Utility />} />
    </Routes>
  )
}

export default App
