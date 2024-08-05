import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import { Home } from './components/Home'

export function Route(){
    return (
        <>
        <li a href='/'>Home</li>
        <Routes>
            <Route path='/' element={<Home />}/>
        </Routes>
        </>
    )
}