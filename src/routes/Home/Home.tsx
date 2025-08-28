import { useEffect, useRef } from 'react'
import styles from './Home.module.css'
import * as THREE from 'three'

function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const rendererRef = useRef<THREE.WebGLRenderer>(null)

    useEffect(() => {
        if (!canvasRef.current) return
        
        rendererRef.current = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
        })

        rendererRef.current.setSize(window.innerWidth, window.innerHeight)


    }, [canvasRef.current])

    return (
        <main className={styles.main}>
            <canvas ref={canvasRef}></canvas>
        </main>
    )
}

export default Home