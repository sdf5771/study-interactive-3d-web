import { useEffect, useRef } from 'react'
import styles from './SphereGeometry.module.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'stats.js';
import dat from 'dat.gui';

function SphereGeometry() {
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
        camera.position.z = 10

        scene.add(camera)

        const ambientLight = new THREE.AmbientLight('white', 0.5)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight('white', 1)
        directionalLight.position.x = 1
        directionalLight.position.y = 3
        directionalLight.position.z = 5
        scene.add(directionalLight)

        const controls = new OrbitControls(camera, rendererRef.current.domElement)

        // AxesHelper
        const axesHelper = new THREE.AxesHelper(10);
        scene.add(axesHelper)

        // GridHelper
        const gridHelper = new THREE.GridHelper(20);
        scene.add(gridHelper)

        const geometry = new THREE.SphereGeometry(5, 64, 64)

        // MeshStandardMaterial: 표준 메시 재질, 더 복잡한 광원 효과 적용
        const material = new THREE.MeshStandardMaterial(
            { 
                color: 'orangered', 
                side: THREE.DoubleSide,
                flatShading: true,
            }
        )
        
        const mesh = new THREE.Mesh(geometry, material)
        
        scene.add(mesh)

        const positionArray = geometry.attributes.position.array // position 속성 값을 담은 Array
        const randomArray: number[] = []; // 각 position 값을 랜덤하게 조정할 값을 담은 Array

        // Array에 인자가 0번째 index부터 [x, y, z] 를 반복하며, 3의 배수로 구성되어 있기 때문에 3씩 증가하면서 반복
        for (let i = 0; i < positionArray.length; i += 3) {
            // 정점(Vertext) 한 개의 x, y, z 좌표를 랜덤하게 조정
            positionArray[i] = positionArray[i] + (Math.random() - 0.5) * 0.2 // x 좌표 조정
            positionArray[i + 1] = positionArray[i + 1] + (Math.random() - 0.5) * 0.2 // y 좌표 조정
            positionArray[i + 2] = positionArray[i + 2] + (Math.random() - 0.5) * 0.2 // z 좌표 조정

            randomArray[i] = (Math.random() - 0.5) * 0.2
            randomArray[i + 1] = (Math.random() - 0.5) * 0.2
            randomArray[i + 2] = (Math.random() - 0.5) * 0.2
        }

        // Dat.GUI
        const gui = new dat.GUI()
        gui.add(camera.position, 'x', -10, 10, 0.01).name(`camera's x`)
        gui.add(camera.position, 'y', -10, 10, 0.01).name(`camera's y`)
        gui.add(camera.position, 'z', -10, 10, 0.01).name(`camera's z`)

        const stats = new Stats()
        document.body.appendChild(stats.dom)

        const clock = new THREE.Clock()

        function draw() {
            const time = clock.getElapsedTime() * 3

            stats.update()

            for (let i = 0; i < positionArray.length; i += 3) {
                positionArray[i] += Math.sin(time + randomArray[i] * 100) * 0.002
                positionArray[i + 1] += Math.sin(time + randomArray[i + 1] * 100) * 0.002
                positionArray[i + 2] += Math.sin(time + randomArray[i + 2] * 100) * 0.002
            }

            geometry.attributes.position.needsUpdate = true // position 속성 값을 업데이트

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

            if(axesHelper) {
                axesHelper.dispose()
            }

            if(gridHelper) {
                gridHelper.dispose()
            }

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

export default SphereGeometry