import { Quiz } from "./Quiz";
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'
import { useLocation } from "react-router-dom";

export default function QustionsPage() {
    const [trivia, setTrivia] = useState([])
    const [score, setScore] = useState(0)
    const [isSubmitted, setIsSubmited] = useState(false)

    const location = useLocation
    const formData = location.state?.formData || {}
    console.log(formData)

    
    useEffect(()=>{
    fetchATriviaQuestions()
    }, [])

    const fetchATriviaQuestions = (()=> {
    fetch('https://the-trivia-api.com/v2/questions')
        .then(res => res.json())
        .then(result => {
        const updatedTrivia = result.map(question => {
            const correct = { answer: question.correctAnswer, isHeld: false, id: nanoid(), isCorrect: true }
            const incorrect = question.incorrectAnswers.map(answer => ({
            answer, id: nanoid(), isHeld: false, isCorrect: false
            }));
            let allAnswers = [...incorrect, correct]
            const shuffleAllAnswers = allAnswers.sort((a,b)=> 0.5 - Math.random())
            allAnswers = shuffleAllAnswers
            return { ...question, allAnswers, questionText: question.question }
        });
        setTrivia(updatedTrivia);
        });
    })

    function selectAnswer(questionId, answerId) {
    setTrivia(prevTrivia =>
    prevTrivia.map(question => {
        if (question.id !== questionId) return question
        const updatedAnswers = question.allAnswers.map(answer => ({
        ...answer,
        isHeld: answer.id === answerId
        }));
        return { ...question, allAnswers: updatedAnswers }
      })
    )
  }

  function handleSubmit(event) {
    event.preventDefault();
    const score = trivia.reduce((acc, question) => {
      const selectedAnswer = question.allAnswers.find(answer => answer.isHeld);
      return acc + (selectedAnswer && selectedAnswer.answer === question.correctAnswer ? 1 : 0)
    }, 0);
    setScore(score)
    setIsSubmited(true)
  }
  
  const everyQuestionAnswered = trivia.every(question =>
    question.allAnswers.some(answer => answer.isHeld)
  )

  function handleTryAgain(){
    fetchATriviaQuestions()
  }

  return (
    <>
    <div className="main">
    <form action="">
      {trivia.map(trivia => (
        <Quiz
          key={trivia.id}
          question={trivia.question}
          choices={trivia.allAnswers}
          selectAnswer={(answerId) => selectAnswer(trivia.id, answerId)}
          isSubmitted={isSubmitted}
        />
      ))}
      <div className="submit--button">
        {isSubmitted && score >= 7 ? <Confetti/> : ''}
        {isSubmitted && (
          <div className="score--text">You scored {score} out of {trivia.length}</div>
        )}
        <button onClick={isSubmitted ? handleTryAgain : handleSubmit} disabled={!everyQuestionAnswered}>
          {isSubmitted ? 'Try Again' : 'Submit'}
        </button>
      </div>
    </form>
    </div>
    </>
  );
}
