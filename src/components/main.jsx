import {useState} from "react"
import DieContainer from "./dieContainer.jsx"
import RollDie from "./rollDie.jsx"

export default function Main(){


    const [Arr,setArr] = useState(getDieVal);

    const heldDice = Arr.filter(ele => ele.isHeld).length

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
        console.log(temp)
        setArr(temp)
    }

    function winGame(){
        console.log(heldDice)
        return heldDice === 10;
    }
    function holdDice(ID){
        winGame()
        setArr(prev => prev.map( die =>
            die.id === ID ? {...die, isHeld: !die.isHeld} : die
            )
        )
        console.log(Arr)
    }

    return(
        <>
            <DieContainer dieProp={Arr} holdDice={holdDice}/>
            <RollDie handelClick={rollDie}/>
        </>
    )
}