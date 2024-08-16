export function Navbar(){
    return(
        <>
            <div className="navbar">
                <section className="flex">
                <h1>Quizzical</h1>
                <div className="">
                    <ul className="nav--items flex">
                        <li><a href="">Your Stats</a></li>
                        <li><a href="" className="sign-in">Sign In</a></li>
                        <li><a href="" className="sign-up">Sign Up</a></li>
                    </ul>
                </div>
                </section>
            </div>
        </>
    )
}