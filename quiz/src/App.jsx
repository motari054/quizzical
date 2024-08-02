import { Quiz } from "./components/Quiz";
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

export default function App() {
  const [trivia, setTrivia] = useState([]);

  useEffect(() => {
    fetch('https://the-trivia-api.com/v2/questions')
      .then(res => res.json())
      .then(result => {
        const updatedTrivia = result.map(question => {
          const correct = { answer: question.correctAnswer, isHeld: false, id: nanoid() };
          const incorrect = question.incorrectAnswers.map(answer => ({
            answer, id: nanoid(), isHeld: false
          }));
          const allAnswers = [...incorrect, correct];
          return { ...question, allAnswers, questionText: question.question };
        });
        setTrivia(updatedTrivia);
      });
  }, []);

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

  return (
    <>
      {trivia.map(triviaItem => (
        <Quiz
          key={triviaItem.id}
          question={triviaItem.questionText}
          choices={triviaItem.allAnswers}
          selectAnswer={(answerId) => selectAnswer(triviaItem.id, answerId)}
        />
      ))}
    </>
  );
}
