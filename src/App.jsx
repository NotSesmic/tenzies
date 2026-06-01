import Header from "./components/header.jsx"
import Main from "./components/main.jsx"

export default function App(){

  return (
      <>
          <div className={"flex flex-col justify-center items-center gap-20"}>
          <Header/>
          <Main/>
          </div>
      </>
  )

}