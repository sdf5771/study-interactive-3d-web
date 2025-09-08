import { Routes, Route } from 'react-router-dom'
import { Home, Camera, Gsap, Utility, Transform, Group, Geometry, SphereGeometry, LoadGltf } from './routes'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/gsap" element={<Gsap />} />
      <Route path="/utility" element={<Utility />} />
      <Route path="/transform" element={<Transform />} />
      <Route path="/group" element={<Group />} />
      <Route path="/geometry" element={<Geometry />} />
      <Route path="/sphere-geometry" element={<SphereGeometry />} />
      <Route path="/load-gltf" element={<LoadGltf />} />
    </Routes>
  )
}

export default App
