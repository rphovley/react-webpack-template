import React from 'react'
import tw, { GlobalStyles } from 'twin.macro'
import { handleAdaTransfer } from './lib'
const Main = tw.div`bg-blue-900`

const App = () => {
    return (
        <>
            <GlobalStyles />
            <Main tw="text-white flex items-center flex-col h-screen justify-evenly">
                <img src={require('./assets/abstract circle.svg')} width="30%" />
                <div tw="bg-red-500 p-10 rounded ">
                    hello world
                </div>
                <button onClick={handleAdaTransfer}>Transfer</button>
            </Main>
        </>
    )
}

export default App
