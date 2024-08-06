import { useState } from 'react';
import '../assets/homeContents.css'
import { Link } from 'react-router-dom';
import Select from 'react-select'
export function HomeContents(){
    const [formData, setFormData] = useState({
        category : '',
        type: '',
        tags : '',
    })

    const categoryOptions = [
        {value : 'Category 1', label : 'Sport'},
        {value : 'Category 2', label : 'Media'},
        {value : 'Category 3', label : 'Business'},
    ]
    const difficulty = [
        {value : 'easy', label: 'Easy'},
        {value : 'medium', label : 'Medium'},
        {value : 'hard', label : 'Hard'},
    ]

    return (
        <>
        <div className='content'>
            <form action=".">
                <label htmlFor="">Category</label>
                <Select options={categoryOptions} />
                <label htmlFor="">Qustion Difficulty</label>
                <Select options={difficulty} />
            </form>
            <Link to='/questions' className="start-quiz-button">
                Start Quiz
            </Link>
        </div>
        </>
    )
}   