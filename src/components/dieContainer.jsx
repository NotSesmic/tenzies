import Die from "./die.jsx"

export default function DieContainer({refContainer,...props}) {
    const dieElement = props.dieProp.map((ele) => <Die id={ele.id} key={ele.id}
                                                       ref={(el) => props.refs.current[ele.id] = el} value={ele.value}
                                                       isHeld={ele.isHeld}
                                                       holdDice={props.holdDice}
                                                       diePress = {props.pressDice}
                                                        />)


    return (
        <>
            <section className={"flex justify-center items-center w-full p-20"}>
                <div ref={refContainer}
                     className={"grid grid-cols-5 grid-rows-2 gap-15 justify-center items-center w-10% "}>
                    {dieElement}
                </div>
            </section>
        </>
    )
}