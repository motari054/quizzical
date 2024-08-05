
export function Quiz({question, choices, selectAnswer, isSubmitted}){
    return (
        <>
        <div className="quiz--page">
            <h2 className="quiz--heading">{question.text}</h2>
            <ul className="quiz--answers">
                {choices.map(choice=>{
                    const isSelected = choice.isHeld
                    const isCorrect = choice.isCorrect
                    const style = {
                        backgroundColor : isSubmitted ? (isCorrect ? '#94D7A2' : 
                            (isSelected ? '#F8BCBC' : '')
                        ) 
                        : (isSelected && '#D6DBF5'),
                        // backgroundColor : choice.isHeld && '#D6DBF5',
                        // border : choice.isHeld && 'none'
                        border : isSubmitted ? (isCorrect || isSelected ? 'none' : '') : ''
                    }
                    return (
                    <li 
                    className="quiz--choice"
                    key={choice.id}
                    onClick={()=>!isSubmitted && selectAnswer(choice.id)}
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