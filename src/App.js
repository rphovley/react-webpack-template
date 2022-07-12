import React, { useState } from 'react'
import tw, { GlobalStyles } from 'twin.macro'
import { handleAdaTransfer } from './lib'
const Main = tw.div`bg-blue-900`

const App = () => {
    const [addr, setAddr] = useState()

    const handleChange = (event) => {
        console.log(event.target.value)
        setAddr(event.target.value)
    }

    const submit = () => {
        handleAdaTransfer(addr,)
    }

    return (
        <>
            <GlobalStyles />
            <Main tw="text-white flex items-center flex-col h-screen justify-evenly">
                <img src={require('./assets/abstract circle.svg')} width="30%" />
                <div tw="bg-red-500 p-10 rounded ">
                    hello world
                </div>
                <button onClick={submit}>Transfer</button>
                <input name="address" value={addr} onChange={handleChange} />
            </Main>
        </>
    )
}

export default App
