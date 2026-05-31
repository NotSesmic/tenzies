import Die from "./die.jsx"
import {useState,useRef} from "react"

export default function DieContainer(){
    const
    const [Arr,setArr] = useState([1,1,1,1,1,1,1,1,1,1]);



    function generateRandomValues(){
        for(ele of Arr){
            let temp = Math.floor(Math.random()*7);
            setArr(prev => prev[])
        }
    }

    return(
        <>
            <section className={"flex justify-center items-center w-full p-20"}>
            <div className={"grid grid-cols-5 grid-rows-2 gap-15 justify-center items-center w-10% "}>
                <Die/>
                <Die/>
                <Die/>
                <Die/>
                <Die/>
                <Die/>
                <Die/>
                <Die/>
                <Die/>
                <Die/>
            </div>
            </section>
        </>
    )
}