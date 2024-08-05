import '../assets/navbar.css'
export function Navbar(){
    return (
        <>
        <nav>
            <div className="logo">
                <h1 className='nav--heading'>Quizzical</h1>
            </div>
            <ul className='nav--list-items'>
                <li className='nav--take-quiz'>Take Quiz</li>
                <li className='nav--sign-up'>Sign In</li>
                <li className='nav--sign-in'>Sign Up</li>
                
            </ul>
        </nav>
        </>
    )
}