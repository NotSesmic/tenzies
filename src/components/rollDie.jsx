
export default function Roll(props){



    return(
        <>
            {
                !props.gameCondition ?
                <button onClick={props.handelClick}
                className={"w-40 h-15 text-2xl font-bold text-white border-0 outline-0 rounded-md bg-indigo-600 hover:bg-indigo-700"}>Roll</button> :

                <button
                    onClick={props.gameOver}
                    className={"w-40 h-15 text-2xl font-bold text-white border-0 outline-0 rounded-md bg-amber-600 hover:bg-amber-700"}>Play again</button>
            }
        </>
    )
}