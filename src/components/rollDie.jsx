
export default function Roll(props){



    return(
        <>
        <button onClick={props.handelClick}
            className={"w-40 h-15 text-2xl font-bold text-white border-0 outline-0 rounded-md bg-indigo-600 hover:bg-indigo-700"}>Roll</button>
        </>
    )
}