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
        scene.fog = new THREE.Fog('black', 3, 7)

        // Perspective camera (원근 카메라)
        const fov = 75 // field of view
        const aspect = windowWidth / windowHeight // aspect ratio
        const near = 0.1 // near plane
        const far = 1000 // far plane

        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
        camera.position.x = 2
        camera.position.y = 2
        camera.position.z = 7

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

        const meshes: THREE.Mesh[] = [];
        let mesh: THREE.Mesh;

        for (let i = 0; i < 10; i++) {
            mesh = new THREE.Mesh(geometry, material)
            mesh.position.x = Math.random() * 5 - 2.5
            mesh.position.z = Math.random() * 5 - 2.5
            meshes.push(mesh)
            scene.add(mesh)
        }
        
        // const mesh = new THREE.Mesh(geometry, material)
        // scene.add(mesh)

        // const clock = new THREE.Clock()

        function draw() {
            // // 각도는 Radian 단위를 이용
            // // 360도는 2PI = 3.141592653589793
            // // 1도는 PI / 180 = 0.017453292519943295
            // mesh.rotation.x += 0.01
            // mesh.rotation.y += 0.01
            // console.log(positionYFlag)

            // const time = clock.getElapsedTime()
            // console.log(time)

            // // 각도를 라디안 단위로 변환
            // mesh.rotation.x += THREE.MathUtils.degToRad(1) // 1도씩 증가
            // mesh.rotation.y += THREE.MathUtils.degToRad(1) // 1도씩 증가

            // // 시간을 사용해서 rotation의 값을 계산
            // mesh.rotation.x = time
            // mesh.rotation.y = time
            // mesh.rotation.z = time

            // mesh.position.y = time

            // light.position.x += 0.01
            // light.position.z += 0.01
            if(meshes.length > 0) {
                meshes.forEach(mesh => {
                    mesh.rotation.y += 0.01
                })
            }

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

export default Camera