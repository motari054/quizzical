import { useState } from 'react';
import '../assets/homeContents.css'
import { Link } from 'react-router-dom';
import Select from 'react-select'
export function HomeContents(){
    const [formData, setFormData] = useState({
        category : '',
        difficulty : '',
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

    const handleCategoryChange = (selectedOption)=> {
        setFormData(prevData=> ({
            ...prevData,
            category : selectedOption ? selectedOption.value : ''
        }))
    }

    const handleDifficultyChange = (selectedOption)=>{
        setFormData(prevData=>({
            ...prevData,
            difficulty : selectedOption ? selectedOption.value : ''
        }))
    }

    return (
        <>
        <div className='content'>
            <form action=".">
                <label htmlFor="">Category</label>
                <Select 
                options={categoryOptions} 
                onChange={handleCategoryChange}
                />
                <label htmlFor="">Qustion Difficulty</label>
                <Select 
                options={difficulty} 
                onChange={handleDifficultyChange}                />
            </form>
            <Link to='/questions' 
            className="start-quiz-button"
            state={formData}
            >
                Start Quiz
            </Link>
        </div>
        </>
    )
}   