import { useEffect, useRef } from 'react'
import styles from './Camera.module.css'
import * as THREE from 'three'

function Camera() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const rendererRef = useRef<THREE.WebGLRenderer>(null)

    useEffect(() => {
        if (!canvasRef.current) return
        
        rendererRef.current = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
        })

        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight

        rendererRef.current.setSize(windowWidth, windowHeight)
        rendererRef.current.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

        const scene = new THREE.Scene()

        // Perspective camera (원근 카메라)
        const fov = 75 // field of view
        const aspect = windowWidth / windowHeight // aspect ratio
        const near = 0.1 // near plane
        const far = 1000 // far plane

        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
        camera.position.x = 2
        camera.position.y = 2
        camera.position.z = 5

        // // Orthographic camera (직교 카메라)
        // const camera = new THREE.OrthographicCamera(
        //     -(windowWidth / windowHeight), // left plane
        //     windowWidth / windowHeight, // right plane
        //     1, // top plane
        //     -1, // bottom plane
        //     0.1, // near plane
        //     1000 // far plane
        // )

        // camera.position.x = 2
        // camera.position.y = 2
        // camera.position.z = 5
        // camera.lookAt(0, 0, 0) 
        // camera.zoom = 0.5
        // camera.updateProjectionMatrix()

        // scene.add(camera)

        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        rendererRef.current.render(scene, camera)

        function resizeHandler() {
            if(!camera || !rendererRef.current) return
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            rendererRef.current.setSize(window.innerWidth, window.innerHeight)
            rendererRef.current.render(scene, camera)
        }

        window.addEventListener('resize', resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }

    }, [canvasRef.current])

    return (
        <main className={styles.main}>
            <canvas ref={canvasRef} />
        </main>
    )
}

export default Camera