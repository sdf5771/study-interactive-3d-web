import { useEffect, useRef } from 'react'
import styles from './Gsap.module.css'
import * as THREE from 'three'
import gsap from 'gsap'

function Gsap() {
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
        camera.position.z = 7

        scene.add(camera)

        const light = new THREE.DirectionalLight(0xffffff, 1)
        light.position.x = 1
        light.position.y = 3
        light.position.z = 5
        scene.add(light)

        const geometry = new THREE.BoxGeometry(1, 1, 1)
        // // MeshBasicMaterial: 기본 메시 재질, 단순 색상 적용
        // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

        // MeshStandardMaterial: 표준 메시 재질, 더 복잡한 광원 효과 적용
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
        
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        function draw() {
            rendererRef.current?.render(scene, camera)

            window.requestAnimationFrame(draw)
        }

        draw()

        // Apply GSAP to the mesh
        gsap.to(mesh.position, {
            y: 3,
            z: 1,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'linear'
        })

        gsap.to(mesh.rotation, {
            x: 3,
            z: 1,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'linear'
        })

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

export default Gsap