import { useState } from 'react';
import '../assets/homeContents.css';
import { Link } from 'react-router-dom';
import Select from 'react-select';

export function HomeContents() {
    const [formData, setFormData] = useState({
        category: '',
        difficulty: '',
    });

    const categoryOptions = [
        { value: 'Category 1', label: 'Sport' },
        { value: 'Category 2', label: 'Media' },
        { value: 'Category 3', label: 'Business' },
    ];

    const difficultyOptions = [
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'hard', label: 'Hard' },
    ];

    const handleCategoryChange = (selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            category: selectedOption ? selectedOption.value : '',
        }));
    };

    const handleDifficultyChange = (selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            difficulty: selectedOption ? selectedOption.value : '',
        }));
    };

    return (
        <div className='content'>
            <div className='form-group'>
                <label htmlFor='category-select'>Category</label>
                <Select
                    id='category-select'
                    options={categoryOptions}
                    onChange={handleCategoryChange}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='difficulty-select'>Question Difficulty</label>
                <Select
                    id='difficulty-select'
                    options={difficultyOptions}
                    onChange={handleDifficultyChange}
                />
            </div>
            <Link 
                to='./questions'
                className="start-quiz-button"
                state={formData}
            >
                Start Quiz
            </Link>
        </div>
    );
}
