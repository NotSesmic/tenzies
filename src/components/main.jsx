import {useState,useEffect,useRef} from "react"
import DieContainer from "./dieContainer.jsx"
import RollDie from "./rollDie.jsx"
import {nanoid} from "nanoid";
import gsap from "gsap"
import {useGSAP} from "@gsap/react"

export default function Main(){


    const [Arr,setArr] = useState(getDieVal);
    const [gameWon,setGameWon] = useState(false);
    const heldDice = Arr.filter(ele => ele.isHeld).length
    const firstHeldValue = useRef(null);
    const dieRefs = useRef({});
    const dieContainer = useRef(null);
    const [isRolling,setIsRolling] =useState(false);
    const roll = useRef();


    useEffect(() =>
    {
        if(heldDice === 10 && Arr.every(ele => ele.value === firstHeldValue.current)){
            setGameWon(prev=>!prev)
        }
        console.log(gameWon)
    },[heldDice])

    const {contextSafe} = useGSAP(() => {
        roll.current = gsap.timeline(
            {paused:true,
                onStart: () => setIsRolling(true),
                onComplete: () => setIsRolling(false)
            })
    },{scope:dieContainer})


    const rollDice = contextSafe(() => {
        roll.current.clear()
        Arr.forEach((ele) => {
            if(!ele.isHeld){
                roll.current.to(dieRefs.current[ele.id],
                    {
                        rotation: "+=360",
                        transformOrigin: "50% 50%",
                        duration: ".75"
                    }
                    ,"<")
            }
        })
        roll.current.play(0)
    })


    function getDieVal(){
         return new Array(10)
                            .fill(0)
                            .map(()=>{
                                return{
                                    value:Math.ceil(Math.random()*6),
                                     isHeld: false,
                                    id: nanoid(),
                                }
                            })
    }

    function rollDie(){

        const temp = Arr.map(prev =>
        prev.isHeld ? prev : {...prev, value: Math.ceil(Math.random()*6)}
        )
        setArr(temp)
    }

    function holdDice(ID){
        setArr(prev => prev.map( die =>
            die.id === ID ? {...die, isHeld: !die.isHeld} : die
            )
        )
        if(firstHeldValue.current === null){
            firstHeldValue.current = Arr.find(die => die.id === ID)?.value
        }
    }
    function gameOver(){
        setArr(getDieVal)
        firstHeldValue.current = null;
        setGameWon(prev => !prev)
    }



    return(
        <>
            <DieContainer refContainer={dieContainer} refs={dieRefs} dieProp={Arr} holdDice={holdDice}/>
            <RollDie isRolling={isRolling} rollDice={rollDice} handelClick={rollDie} gameCondition={gameWon} gameOver={gameOver}/>
        </>
    )
}