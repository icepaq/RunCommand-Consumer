import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import Status from './Status.js';
import Console from './Console.js';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            isLoaded: false,
            screen: 1,
            items: [],
            codes: []
        }
    }
    
    testFunction() {
        console.log('Test function');
    }

    render() {
        if(parseInt(this.state.screen) === 1) {
            return (
                <Console />
            );
        }
        else if(parseInt(this.state.screen) === 2) {
            return (
                <Status />
            )
        }
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
