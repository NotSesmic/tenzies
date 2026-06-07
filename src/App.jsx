import Header from "./components/header.jsx"
import Main from "./components/main.jsx"
import {useState} from "react"

export default function App(){

    const [gameWon,setGameWon] = useState(false);

    function changeGameState() {
        setGameWon(prev => !prev)
    }

  return (
      <>
          <div className={"flex flex-col justify-center items-center gap-20"}>
          <Header gameState={gameWon} />
          <Main gameCondition={changeGameState} gameState={gameWon}/>
          </div>
      </>
  )

}