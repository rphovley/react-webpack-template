import React, { useState } from 'react'
import tw, { GlobalStyles } from 'twin.macro'
import { handleAdaTransfer } from './lib'
const Main = tw.div`bg-blue-900`

const App = () => {
    const [addr, setAddr] = useState()
    const [amt, setAmt] = useState()
    const [network, setNetwork] = useState()
    const [wallet, setWallet] = useState()

    const handleAddr = (event) => {
        console.log(event.target.value)
        setAddr(event.target.value)
    }

    const handleAmt = (event) => {
        console.log(event.target.value)
        setAmt(event.target.value)
    }
    const handleNetwork = (event) => {
        console.log(event.target.value)
        setNetwork(event.target.value)
    }
    const handleWallet = (event) => {
        console.log(event.target.value)
        setWallet(event.target.value)
    }
    const submit = () => {
        handleAdaTransfer(addr,amt, network,wallet)
    }

    const input_style = {
      color: "black"
    };

    return (
        <>
            <GlobalStyles />
            <Main tw="text-white flex items-center flex-col h-screen justify-evenly">
                <img src={require('./assets/abstract circle.svg')} width="30%" />
                <div tw="bg-red-500 p-10 rounded ">
                    hello world
                </div>
                <button onClick={submit}>Transfer</button>
                <input name="address" style={input_style} value={addr} onChange={handleAddr} />
                <input name="amt" style={input_style} value={amt} onChange={handleAmt} />
                <input name="network" style={input_style} value={network} onChange={handleNetwork} />
                <input name="wallet" style={input_style} value={wallet} onChange={handleWallet} />
            </Main>
        </>
    )
}

export default App
