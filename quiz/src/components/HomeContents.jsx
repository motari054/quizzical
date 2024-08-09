import '../assets/homeContents.css';
import { Link } from 'react-router-dom';


export function HomeContents() {
    return (
        <>
            <Link to='./questions' className="start-quiz-button">
                Start Quiz
            </Link>
        </>
    )
}
