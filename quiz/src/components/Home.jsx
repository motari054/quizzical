import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home--page">
      <h1>Quizzical</h1>
      <h4>Some Description needed</h4>
      <Link to='/questions' className="start-quiz-button">
        Start Quiz
      </Link>
    </div>
  );
}
