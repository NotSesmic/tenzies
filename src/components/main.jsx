import {useState,useEffect,useRef} from "react"
import DieContainer from "./dieContainer.jsx"
import RollDie from "./rollDie.jsx"
import {nanoid} from "nanoid";
import gsap from "gsap"
import {useGSAP} from "@gsap/react"
import {GSDevTools} from "gsap/GSDevTools";


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
        if(heldDice === 10 && Arr.every(ele => ele.isHeld && ele.value === firstHeldValue.current)){
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


    // eslint-disable-next-line react-hooks/refs
    const rollDice = contextSafe(() => {
        roll.current.clear()

        Arr.forEach((ele) => {
            if(!ele.isHeld) {
                roll.current.set(dieRefs.current[ele.id], {
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1), 0 0 0px 0px rgba(0,0,0,0)"
                }, "<")
            }
        })
        Arr.forEach((ele) => {
            if(!ele.isHeld) {
                roll.current.to(dieRefs.current[ele.id], {
                    rotation: "+=360",
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1), 0 0 15px 5px rgba(0,0,0,0.3)",
                    duration: .75,
                    ease: "sine.inOut",

                }, "<")
            }
        })
        Arr.forEach((ele) => {
            if(!ele.isHeld) {
                roll.current.to(dieRefs.current[ele.id], {
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1), 0 0 0px 0px rgba(0,0,0,0)",
                    duration: 0.1,
                    ease: "sine.out",
                    clearProps:"all"
                })
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

        if(firstHeldValue.current === null){
            firstHeldValue.current = Arr.find(die => die.id === ID)?.value
        }

        setArr(prev => prev.map(die =>
                (die.id === ID && die.value === firstHeldValue.current ) ? {...die, isHeld: !die.isHeld} : die
            )
        )

    }

    gsap.registerPlugin(GSDevTools)

    // eslint-disable-next-line react-hooks/refs
        const diePress = contextSafe((prop) => {

            if(firstHeldValue.current === null) return

            if(prop.value !== firstHeldValue.current){
                const tl = gsap.timeline();
                    tl.to(dieRefs.current[prop.id], {
                        scale: 1.2,
                        duration: 0.15,
                    })
                    .to(dieRefs.current[prop.id], {

                        keyframes: [
                            { rotation: 10, backgroundColor: "#ff3f43", duration: 0.07 },
                            { rotation: -10, duration: 0.07 },
                            { rotation: 10, duration: 0.07 },
                            { rotation: -10, duration: 0.07 },
                            { rotation: 0, duration: 0.07},
                        ],
                    },"<")
                    .to(dieRefs.current[prop.id], {
                        scale: 1,
                        backgroundColor:"#f3f4f6",
                        duration: 0.15,
                        clearProps: "all"
                    },">");
                }

            // eslint-disable-next-line react-hooks/refs
        },{scope:dieContainer})

    // GSDevTools.create(rollDice)


    function gameOver(){
        setArr(getDieVal)
        firstHeldValue.current = null;
        setGameWon(prev => !prev)
    }

    return(
        <>
            <DieContainer refContainer={dieContainer} pressDice={diePress} refs={dieRefs} dieProp={Arr} holdDice={holdDice}/>
            <RollDie isRolling={isRolling} rollDice={rollDice} handelClick={rollDie} gameCondition={gameWon} gameOver={gameOver}/>
        </>
    )
}