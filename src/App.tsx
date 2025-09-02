import { Routes, Route } from 'react-router-dom'
import { Home, Camera, Gsap, Utility, Transform, Group } from './routes'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/gsap" element={<Gsap />} />
      <Route path="/utility" element={<Utility />} />
      <Route path="/transform" element={<Transform />} />
      <Route path="/group" element={<Group />} />
    </Routes>
  )
}

export default App
