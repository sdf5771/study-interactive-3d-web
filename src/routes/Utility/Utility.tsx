import { useEffect, useRef } from 'react'
import styles from './Utility.module.css'
import * as THREE from 'three'

function Utility() {
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
        camera.position.x = 1
        camera.position.y = 3
        camera.position.z = 2

        scene.add(camera)

        const ambientLight = new THREE.AmbientLight('white', 0.5)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight('white', 1)
        directionalLight.position.x = 1
        directionalLight.position.y = 3
        directionalLight.position.z = 5
        scene.add(directionalLight)

        // AxesHelper
        const axesHelper = new THREE.AxesHelper(3);
        scene.add(axesHelper)

        // GridHelper
        const gridHelper = new THREE.GridHelper(5);
        scene.add(gridHelper)

        const geometry = new THREE.BoxGeometry(1, 1, 1)

        // MeshStandardMaterial: 표준 메시 재질, 더 복잡한 광원 효과 적용
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
        
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.x = 2;
        
        scene.add(mesh)

        camera.lookAt(mesh.position)

        const clock = new THREE.Clock()

        function draw() {
            const time = clock.getElapsedTime();

            mesh.rotation.y = time;

            rendererRef.current?.render(scene, camera)


            window.requestAnimationFrame(draw)
        }

        draw()

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

export default Utility