import {useRef} from "react"
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {SplitText} from "gsap/SplitText";


export default function Header(props){

    gsap.registerPlugin(SplitText)

    const titleRef = useRef();

    useGSAP(() => {
        if(props.gameState){
            let split = new SplitText(titleRef.current,{type:"chars"});
            const tl = gsap.timeline();
            tl
                .to(split.chars,{
                    y: -20,
                    stagger: { each: 0.06, from: "start", repeat: 3, yoyo: true },
                    duration: 0.4, ease: "sine.inOut"

            })
                .to(split.chars,{
                        keyframes: {
                            "0%": {color:"black"},
                            "10%": {color:"#9400D3"},
                            "20%":{color:"#4B0082"},
                            "30%": {color:"#0000FF"},
                             "40%": {color:"#00FF00"},
                            "50%": {color:"#FFFF00"},
                            "60%": {color:"#FF7F00"},
                            "70%": {color:"#FF0000"},
                            "80%": {color:"#ff004f"},
                            "90%": {color: "#ff00fa"},
                            "100%": {color: "black"},
                        },
                    stagger: {each: 0.06, from: "start",repeat: 3,yoyo: true},
                    ease: "sine.inOut",
                    duration: 0.4,
                    },"<"
                )
                .from(split.chars, {
                    scale: 1.5,
                    ease: "sine.inOut",
                    duration: 2.4,
                },"<")
        }
    },[props.gameState])

    return(
        <>
            <header className="select-none flex flex-col items-center gap-7 font-inter p-9">
                <h1 ref={titleRef} className="text-5xl font-semibold">Tenzies</h1>
                <p className={"text-center text-2xl font-[450]"}>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </header>
        </>
    )
}