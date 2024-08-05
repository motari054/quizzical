import '../assets/homeContents.css'
import { Link } from 'react-router-dom';
export function HomeContents(){
    return (
        <>
        <div className='content'>
            <form action=".">
                {/* <input type="text" />Category
                <input type="text" />Type
                <input type="text" />Tags
                <input type="text" />Type */}
                <div className="category">
                <label htmlFor="">Select Categoty</label>
                <input type="checkbox" name="" id="" />
                </div>
                
            </form>
            <Link to='/questions' className="start-quiz-button">
                Start Quiz
            </Link>
        </div>
        </>
    )
}