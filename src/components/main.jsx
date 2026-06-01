import {useState,useEffect,useRef} from "react"
import DieContainer from "./dieContainer.jsx"
import RollDie from "./rollDie.jsx"

export default function Main(){


    const [Arr,setArr] = useState(getDieVal);
    const [gameWon,setGameWon] = useState(false);
    const heldDice = Arr.filter(ele => ele.isHeld).length
    const firstHeldValue = useRef(null);


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
                            .map((val,index)=>{
                                return{
                                    value:Math.ceil(Math.random()*6),
                                     isHeld: false,
                                    id: index,
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

    function gameOver(){
        setArr(getDieVal)
        firstHeldValue.current = null;
        setGameWon(prev => !prev)
    }

    return(
        <>
            <DieContainer dieProp={Arr} holdDice={holdDice}/>
            <RollDie handelClick={rollDie} gameCondition={gameWon} gameOver={gameOver}/>
        </>
    )
}