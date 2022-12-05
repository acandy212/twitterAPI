
import React from "react";

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
        }
    }
}



<App />

