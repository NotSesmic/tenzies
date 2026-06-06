export default function Roll(props){



    return(
        <>
            {
                !props.gameCondition ?
                <button onClick={() => {
                    props.handelClick();
                    props.rollDice();
                }}
                        disabled={props.isRolling}
                className={`w-44 h-15 text-2xl font-bold text-white border-0 outline-0 rounded-md bg-indigo-600 disabled:bg-indigo-700 disabled:text-gray-200 hover:text-gray-200 hover:bg-indigo-700`}>Roll</button> :

                <button
                    onClick={() => {
                        props.gameOver();
                        props.rollDice();
                    }}
                    className={"w-44 h-15 text-2xl font-bold text-white border-0 outline-0 rounded-md bg-amber-600 hover:text-gray-200 hover:bg-amber-700"}>Play again</button>
            }
        </>
    )
}