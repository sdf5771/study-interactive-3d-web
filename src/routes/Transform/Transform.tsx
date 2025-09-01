import { useEffect, useRef } from 'react'
import styles from './Transform.module.css'
import * as THREE from 'three'
import Stats from 'stats.js';
import dat from 'dat.gui';

function Transform() {
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
        // camera.position.x = 1
        camera.position.y = 1
        camera.position.z = 5

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
        // mesh.position.x = 2;
        
        scene.add(mesh)

        // Dat.GUI
        const gui = new dat.GUI()
        gui.add(mesh.position, 'x', -5, 5, 0.01).name(`mesh's x`)
        gui.add(mesh.position, 'y', -5, 5, 0.01).name(`mesh's y`)
        gui
            .add(mesh.position, 'z')
            .min(-5)
            .max(5)
            .step(0.01)
            .name(`mesh's z`)
        gui.add(camera.position, 'x', -5, 5, 0.01).name(`camera's x`)
        gui.add(camera.position, 'y', -5, 5, 0.01).name(`camera's y`)
        gui.add(camera.position, 'z', -10, 10, 0.01).name(`camera's z`)

        // camera.lookAt(mesh.position)

        const stats = new Stats()
        document.body.appendChild(stats.dom)

        const clock = new THREE.Clock()

        function draw() {
            const time = clock.getElapsedTime();

            mesh.rotation.y = time;

            stats.update()
            camera.lookAt(mesh.position)

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

            if(stats) {
                stats.dom.remove()
            }

            if(gui) {
                gui.destroy()
            }

            if(canvasRef.current) {
                canvasRef.current = null
            }

            if(rendererRef.current) {
                rendererRef.current.dispose()
                rendererRef.current = null
            }
        }

    }, [canvasRef.current])

    return (
        <main className={styles.main}>
            <canvas ref={canvasRef} />
        </main>
    )
}

export default Transform