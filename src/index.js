import React from 'react';
import ReactDOM from 'react-dom';
import { Index } from "./pages";

const elem = document.getElementById('root');

function App (){
    return (
        <>
                <Index />
        </>
    )
}
elem ? ReactDOM.render(<App />,
                        elem):
                        document.write('<h1>ocurrio un eror a la hora de renderizar la página</h1>');
