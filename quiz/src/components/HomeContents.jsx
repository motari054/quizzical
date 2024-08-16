import '../assets/homeContents.css';
import { Link } from 'react-router-dom';


export function HomeContents() {
    return (
        <>
        <section>
            <Link to='./questions' className="button">
                Start Quiz
            </Link>
        </section>
        </>
    )
}
