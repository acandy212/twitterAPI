import { useState } from "react";

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

export default App;