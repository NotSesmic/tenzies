import Die from "./die.jsx"

export default function DieContainer(props){

    const dieElement = props.dieProp.map( (ele,ind) => <Die id={ind} key={ind} value={ele.value} isHeld={ele.isHeld} holdDice={props.holdDice}/>)


    return(
        <>
            <section className={"flex justify-center items-center w-full p-20"}>
            <div className={"grid grid-cols-5 grid-rows-2 gap-15 justify-center items-center w-10% "}>
                {dieElement}
            </div>
            </section>
        </>
    )
}