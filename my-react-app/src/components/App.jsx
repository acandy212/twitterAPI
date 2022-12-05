/*import { useState } from "react";

function App() {
    const [theme, setTheme] = useState('light');

    return (
        <div className={theme}>
            <div classname="background flex">
                <button onClick={() => setTheme(theme = 'light' ? 'dark' : 'light')}> 
                
                
                
                </button>
            </div>
        </div>
    )
}

export default App; */

import React, { Component } from "react";

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
        }
    }
}


