import React from 'react'
import ReactDOM from 'react-dom'
import { Index } from "./pages/index"
import { Page2 } from './pages/page_2'

const elem = document.getElementById('root')
function App (){
    return (
        <>
                <Index />
                <Page2 />
        </>
    )
}
elem ? ReactDOM.render(<App />,
                        elem):
                        document.write('<h1>ocurrio un eror a la hora de renderizar la página</h1>');
