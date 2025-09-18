import React from 'react'
import { Home } from './pages'
import { UseSmoothScroll } from "smooth-motion";

const App = () => {

    return (
        <div>
            <UseSmoothScroll />
            <Home />
        </div>
    )
}

export default App