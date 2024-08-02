
export function Quiz(
    {question, choices, selectAnswer})
{
    
    return (
        <>
        <div className="quiz--page">
            <h2 className="quiz--heading">{question.text}</h2>
            <ul className="quiz--answers">
                {choices.map(choice=>{
                    const style = {
                        backgroundColor : choice.isHeld && '#D6DBF5',
                        border : choice.isHeld && 'none'
                    }
                    return (
                    <li 
                    className="quiz--choice"
                    key={choice.id}
                    onClick={()=>selectAnswer(choice.id)}
                    style={style}
                    >
                        {choice.answer}
                    </li>)
                })}
            </ul>
        </div>
        </>
    )
}