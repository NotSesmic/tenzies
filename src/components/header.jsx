
export default function Header(){
    return(
        <>
            <header className="flex flex-col items-center gap-7 font-inter p-9">
                <h1 className="text-5xl font-semibold">Tenzies</h1>
                <p className={"text-center text-2xl font-[450]"}>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </header>
        </>
    )
}