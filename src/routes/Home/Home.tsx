import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

function Home() {
    const navigate = useNavigate()

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1>Home / Page List</h1>
                <button onClick={() => navigate('/camera')}>Go to Camera</button>
                <button onClick={() => navigate('/gsap')}>Go to Gsap</button>
                <button onClick={() => navigate('/utility')}>Go to Utility</button>
            </div>
        </main>
    )
}

export default Home