import { useDeferredValue, useState, useTransition, useEffect } from "react"

const bigArray = [...Array(20000).keys()]

const Example2 = () => {
    const [inputValue, setInputValue] = useState('')
    const [list, setList] = useState(bigArray)
    const [isPending, startTransition] = useTransition()
    const deferredInput = useDeferredValue(inputValue)

    const handleInput = (e) => {
        setInputValue(e.target.value)
    }

    useEffect(() => {
        startTransition(() => {
            console.log(deferredInput)
            const filtered = bigArray.filter(item => item.toString().includes(deferredInput))
            setList(filtered)
        })
    }, [deferredInput])


    const content = <section style={isPending ? { opacity: 0.4 } : null}>
        <p>Searching for: {deferredInput || "All"}</p>
        {isPending ? <p>Loading...</p> : null}
        <ul>{list.map(item => <li key={item}>{item}</li>)}</ul>
    </section>

    return (
        <div className="App">
            <input type="text" val={inputValue} onChange={handleInput} />
            {content}
        </div>
    );
}
export default Example2