import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { Quiz } from "./Quiz";

export default function QuestionsPage() {
    const [trivia, setTrivia] = useState([]);
    const [score, setScore] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        fetchTriviaQuestions();
    }, []);

    const fetchTriviaQuestions = () => {
        fetch('https://the-trivia-api.com/v2/questions')
            .then(res => res.json())
            .then(result => {
                const updatedTrivia = result.map(question => {
                    const correct = { answer: question.correctAnswer, isHeld: false, id: nanoid() };
                    const incorrect = question.incorrectAnswers.map(answer => ({
                        answer, id: nanoid(), isHeld: false
                    }));
                    const allAnswers = [...incorrect, correct].sort(() => 0.5 - Math.random());
                    return { ...question, allAnswers, questionText: question.question };
                });
                setTrivia(updatedTrivia);
            })
            .catch(error => console.error('Error fetching trivia questions:', error));
    };

    function selectAnswer(questionId, answerId) {
        setTrivia(prevTrivia =>
            prevTrivia.map(question => {
                if (question.id !== questionId) return question;
                const updatedAnswers = question.allAnswers.map(answer => ({
                    ...answer,
                    isHeld: answer.id === answerId
                }));
                return { ...question, allAnswers: updatedAnswers };
            })
        );
    }

    function handleSubmit(event) {
        event.preventDefault();
        const score = trivia.reduce((acc, question) => {
            const selectedAnswer = question.allAnswers.find(answer => answer.isHeld);
            return acc + (selectedAnswer && selectedAnswer.answer === question.correctAnswer ? 1 : 0);
        }, 0);
        setScore(score);
        setIsSubmitted(true);
        navigate('/scores'); // Navigate to the /scores page
    }

    function handleTryAgain() {
        setIsSubmitted(false);
        fetchTriviaQuestions();
    }

    const everyQuestionAnswered = trivia.every(question =>
        question.allAnswers.some(answer => answer.isHeld)
    );

    return (
        <div className="main">
            <form onSubmit={handleSubmit}>
                {trivia.map(question => (
                    <Quiz
                        key={question.id}
                        question={question.questionText}
                        choices={question.allAnswers}
                        selectAnswer={(answerId) => selectAnswer(question.id, answerId)}
                    />
                ))}
                <div className="submit--button">
                    {isSubmitted && (
                        <div className="score--text">
                            You scored {score} out of {trivia.length}
                        </div>
                    )}
                    <button type="submit" disabled={!everyQuestionAnswered}>
                        {isSubmitted ? 'Try Again' : 'Submit'}
                    </button>
                </div>
                {isSubmitted && <Confetti />}
            </form>
        </div>
    );
}
