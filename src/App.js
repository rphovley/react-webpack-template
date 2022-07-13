import React, { useState, useEffect } from 'react'
import tw, { GlobalStyles } from 'twin.macro'
import { handleAdaTransfer, getBalance } from './lib'


const Main = tw.div`bg-blue-900`

const App = () => {
    const [balance, setBalance] = useState(0);

    const [addr, setAddr] = useState()
    const [amt, setAmt] = useState(0)
    const [network, setNetwork] = useState("testnet")
    const [wallet, setWallet] = useState("nami")

    useEffect(() => {
        getBalance(network, wallet)
        .then((b) => setBalance(b));
        
    }, []
    )

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
                <h1>Balance: ₳{balance}</h1>
                {/* <button onClick={() => update_balance()}>⟳</button> */}
                <img src={require('./assets/abstract circle.svg')} width="30%" />
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
