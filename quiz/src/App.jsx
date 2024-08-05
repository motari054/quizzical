import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Questions from './components/QuestionsPage';
import Scores from './components/Scorepage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/questions' element={<Questions/>}/>
        <Route path='/scores' element={<Scores/>}/>
      </Routes>
    </BrowserRouter>
  );
}
