import {useRef} from "react"
import {useGSAP} from "@gsap/react";
import gsap from "gsap"

export default function Roll(props){

    const playAgain = useRef();

    useGSAP(() => {

        const tl = gsap.timeline();
        tl.from(playAgain.current, {
            alpha: 0,
            y:20,
            duration:3
        })
    },[props.gameCondition])

    return(
        <>
            {
                !props.gameCondition ?
                <button onClick={() => {
                    props.handelClick();
                    props.rollDice();
                }}
                        disabled={props.isRolling}
                className={`w-44 h-15 text-2xl font-bold text-white border-0 outline-none rounded-md bg-indigo-500 disabled:bg-indigo-800 disabled:text-gray-300 disabled:opacity-90 active:text-gray-200 active:bg-indigo-700 active:scale-95 hover:text-gray-200 hover:bg-indigo-700`}>Roll</button> :

                <button
                    onClick={() => {
                        props.gameOver();
                        props.rollDice();
                    }}
                    ref={playAgain}
                    className={"w-44 h-15 text-2xl font-bold text-white border-0 outline-none rounded-md bg-amber-500 active:text-gray-200 active:bg-amber-700 active:scale-95 hover:text-gray-200 hover:bg-amber-700"}>Play again?</button>
            }
        </>
    )
}