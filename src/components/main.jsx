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




    useEffect(() =>
    {
        if(heldDice === 10 && Arr.every(ele => ele.value === firstHeldValue.current)){
            setGameWon(prev=>!prev)
        }
        console.log(gameWon)
    },[heldDice])


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
        if(firstHeldValue.current == null){
            firstHeldValue.current = Arr.find(die => die.isHeld)?.value
        }
        setArr(prev => prev.map( die =>
            die.id === ID ? {...die, isHeld: !die.isHeld} : die
            )
        )
    }

    useGSAP(() =>{
        Arr.forEach((ele) => {
            if(!ele.isHeld) {
                gsap.to(dieRefs.current[ele.id],{rotation:360})
            }

        })

    },{scope:dieRefs})

    function gameOver(){
        setArr(getDieVal)
        firstHeldValue.current = null;
        setGameWon(prev => !prev)
    }



    return(
        <>
            <DieContainer refs={dieRefs} dieProp={Arr} holdDice={holdDice}/>
            <RollDie handelClick={rollDie} gameCondition={gameWon} gameOver={gameOver}/>
        </>
    )
}