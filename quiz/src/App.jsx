import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Questions from './Pages/QuestionsPage';

export default function App() {
  return (
    <div className="main">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/questions' element={<Questions/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}
