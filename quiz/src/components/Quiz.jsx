
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
                        backgroundColor : choice.isHeld ? '#15803d' : '#4ade80'
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