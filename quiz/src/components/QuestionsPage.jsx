import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import { Quiz } from './Quiz';

export default function QuestionsPage() {
    const [trivia, setTrivia] = useState([]);
    const [score, setScore] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        fetchATriviaQuestions();
    }, []);

    const fetchATriviaQuestions = async () => {
        try {
            const response = await fetch('https://the-trivia-api.com/v2/questions');
            const result = await response.json();
            const updatedTrivia = result.map(question => {
                const correct = { answer: question.correctAnswer, isHeld: false, id: nanoid(), isCorrect: true };
                const incorrect = question.incorrectAnswers.map(answer => ({
                    answer, id: nanoid(), isHeld: false, isCorrect: false
                }));
                const allAnswers = [...incorrect, correct].sort(() => 0.5 - Math.random());
                return { ...question, allAnswers, questionText: question.question };
            });
            setTrivia(updatedTrivia);
        } catch (error) {
            console.error('Error fetching trivia questions:', error);
        }
    };

    const selectAnswer = (questionId, answerId) => {
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
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const score = trivia.reduce((acc, question) => {
            const selectedAnswer = question.allAnswers.find(answer => answer.isHeld);
            return acc + (selectedAnswer && selectedAnswer.answer === question.correctAnswer ? 1 : 0);
        }, 0);
        setScore(score);
        setIsSubmitted(true);
    };

    const everyQuestionAnswered = trivia.every(question =>
        question.allAnswers.some(answer => answer.isHeld)
    );

    const handleTryAgain = () => {
        setIsSubmitted(false);
        fetchATriviaQuestions();
    };

    return (
        <div className="main">
            <form onSubmit={!isSubmitted ? handleSubmit : handleTryAgain}>
                {trivia.map(question => (
                    <Quiz
                        key={question.id}
                        question={question.questionText}
                        choices={question.allAnswers}
                        selectAnswer={(answerId) => selectAnswer(question.id, answerId)}
                        isSubmitted={isSubmitted}
                    />
                ))}
                <div className="submit--button">
                    {isSubmitted && score >= 7 && <Confetti />}
                    {isSubmitted && (
                        <div className="score--text">You scored {score} out of {trivia.length}</div>
                    )}
                    <button type="submit" disabled={!everyQuestionAnswered}>
                        {isSubmitted ? 'Try Again' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
}
