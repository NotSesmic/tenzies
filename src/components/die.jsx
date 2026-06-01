
export default function Die(props){

    return(
        <>
            <button
                onClick={() => props.holdDice(props.id)}
                disabled={props.isHeld}
                className={`size-22 rounded-xl shadow-lg/15 ${props.isHeld ? "bg-green-300 hover:bg-green-400" : "bg-gray-100 hover:bg-gray-200" } outline-0 border-0 text-4xl font-bold font-inter`}>{props.value}</button>
        </>
    )
}