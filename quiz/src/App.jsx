import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Questions from './components/QuestionsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/questions' element={<Questions/>}/>
      </Routes>
    </BrowserRouter>
  );
}
