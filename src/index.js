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

    callAPI() {
        console.log('Calling API');
        fetch("http://localhost:8080/getouput?api_key=NEWAPIKEY")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        error: false,
                        isLoaded: true,
                        items: result.content
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: true
                    });
                }
            );
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