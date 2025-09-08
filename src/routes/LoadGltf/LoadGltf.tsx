import { useEffect, useRef } from 'react'
import styles from './LoadGltf.module.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Stats from 'stats.js';
import dat from 'dat.gui';

function LoadGltf() {
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
        const clock = new THREE.Clock()

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
        
        const gltfLoader = new GLTFLoader()

        gltfLoader.load('/miffy__bg.glb', 
            (gltf) => {
                const bones = gltf.scene.getObjectsByProperty('isBone', true);
                console.log('bones : ', bones)

                const skinnedMeshes = gltf.scene.getObjectsByProperty('isSkinnedMesh', true);
                console.log('skinnedMeshes : ', skinnedMeshes)

                const mixer = new THREE.AnimationMixer(gltf.scene)

                gltf.animations.forEach((animation) => {
                    console.log(animation)
                    mixer.clipAction(animation, gltf.scene).loop = THREE.LoopRepeat
                    mixer.clipAction(animation, gltf.scene).play()
                    scene.add(gltf.scene)
                })

                function drawModel() {
                    const time = clock.getDelta() * 6.5
                    // const time = clock.getElapsedTime() * 0.01
                    
                    mixer.update(time)
                    // console.log(time)
        
                    rendererRef.current?.render(scene, camera)
        
                    window.requestAnimationFrame(drawModel)
                }

                drawModel()

                const Spine = bones[0];
                const Head = bones[1];
                const ArmL = bones[2];
                const LegL = bones[3];
                const ArmR = bones[4];
                const LegR = bones[5];

                let moveFlag = false;
                let armMovementSwapFlag = false;
                let legMovementSwapFlag = false;
                const legMaxThreshold = 0.8    // 최대 회전 각도
                const legMinThreshold = -0.8   // 최소 회전 각도
                const armMaxThreshold = 0.8
                const armMinThreshold = -0.8

                function armMovement(){
                    if(ArmL.rotation.x >= armMaxThreshold) {
                        armMovementSwapFlag = false;
                    }
                    else if(ArmL.rotation.x <= armMinThreshold) {
                        armMovementSwapFlag = true;
                    }
                    
                    if(armMovementSwapFlag) {
                        ArmL.rotation.x += 0.02
                        ArmR.rotation.x -= 0.02
                    } else {
                        ArmL.rotation.x -= 0.02
                        ArmR.rotation.x += 0.02
                    }
                }

                function legMovement(){
                    // 최대 threshold에 도달하면 방향을 바꿈
                    if(LegL.rotation.x >= legMaxThreshold) {
                        legMovementSwapFlag = true;
                    }
                    // 최소 threshold에 도달하면 방향을 바꿈
                    else if(LegL.rotation.x <= legMinThreshold) {
                        legMovementSwapFlag = false;
                    }

                    if(legMovementSwapFlag) {
                        // 감소 방향으로 회전
                        LegL.rotation.x -= 0.02
                        LegR.rotation.x += 0.02
                    } else {
                        // 증가 방향으로 회전
                        LegL.rotation.x += 0.02
                        LegR.rotation.x -= 0.02
                    }
                }

                function resetLegAndArmMovement(){
                    LegL.rotation.x = 0;
                    LegR.rotation.x = 0;
                    ArmL.rotation.x = 0;
                    ArmR.rotation.x = 0;
                }

                window.addEventListener('keydown', (event) => {
                    console.log(event)
                    if(moveFlag) return;
                    moveFlag = true;
                    if(event.key === 'w'){
                        let animationId = null;
                        function moveForward(){
                            // ArmL.rotation.x += 0.05
                            // ArmR.rotation.x += 0.05
                            Spine.position.z += 0.01
                            legMovement()
                            armMovement()
                            animationId = window.requestAnimationFrame(moveForward)
                        }
                        moveForward()
                        setTimeout(() => {
                            window.cancelAnimationFrame(animationId!);
                            console.log("Move Forward");
                        }, 100);
                    }
                    if(event.key === 's'){
                        // Spine.position.z -= 0.1
                        
                        let animationId = null;
                        function moveForward(){
                            console.log(LegL.rotation.x, LegR.rotation.x)

                            // ArmL.rotation.x -= 0.05
                            // ArmR.rotation.x -= 0.05
                            armMovement()
                            Spine.position.z -= 0.01
                            legMovement()
                            animationId = window.requestAnimationFrame(moveForward)
                        }
                        moveForward()
                        setTimeout(() => {
                            window.cancelAnimationFrame(animationId!);
                            console.log("Move Backward");
                        }, 100);
                    }
                    if(event.key === 'a'){
                        let animationId = null;
                        function moveLeft(){
                            // ArmL.rotation.x += 0.05
                            // ArmR.rotation.x += 0.05
                            armMovement()
                            Spine.position.x -= 0.01
                            legMovement()
                            animationId = window.requestAnimationFrame(moveLeft)
                        }
                        moveLeft()
                        setTimeout(() => {
                            window.cancelAnimationFrame(animationId!);
                            console.log("Move Left");
                        }, 100);
                    }
                    if(event.key === 'd'){
                        let animationId = null;
                        function moveRight(){
                            // ArmL.rotation.x -= 0.05
                            // ArmR.rotation.x -= 0.05
                            armMovement()
                            Spine.position.x += 0.01
                            legMovement()
                            animationId = window.requestAnimationFrame(moveRight)
                        }
                        moveRight()
                        setTimeout(() => {
                            window.cancelAnimationFrame(animationId!);
                            console.log("Move Right");
                        }, 100);
                    }
                    if(event.key === ' ') {
                        let animationIdUp = null;
                        let animationIdDown = null;
                        function moveUp(){
                            Spine.position.y += 0.01
                            legMovement()
                            armMovement()
                            animationIdUp = window.requestAnimationFrame(moveUp)
                        }
                        function moveDown(){
                            Spine.position.y -= 0.01
                            legMovement()
                            armMovement()
                            animationIdDown = window.requestAnimationFrame(moveDown)
                        }
                        moveUp()
                        
                        setTimeout(() => {
                            window.cancelAnimationFrame(animationIdUp!);
                            console.log("Move Up");
                            moveDown()
                        }, 1000);

                        setTimeout(() => {
                            window.cancelAnimationFrame(animationIdDown!);
                            console.log("Move Down");
                            resetLegAndArmMovement()
                        }, 2000);
                    }
                    moveFlag = false
                })

            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.error(error)
            }
        )


        // Dat.GUI
        const gui = new dat.GUI()
        gui.add(camera.position, 'x', -10, 10, 0.01).name(`camera's x`)
        gui.add(camera.position, 'y', -10, 10, 0.01).name(`camera's y`)
        gui.add(camera.position, 'z', -10, 10, 0.01).name(`camera's z`)

        const stats = new Stats()
        document.body.appendChild(stats.dom)

        

        function draw() {
            const time = clock.getElapsedTime() * 3

            stats.update()

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
            <button 
                style={{ position: 'absolute', top: '10px', left: '300px', backgroundColor: 'black', color: 'white', padding: '10px 20px', borderRadius: '5px' }}
            >Call Action</button>
        </main>
    )
}

export default LoadGltf