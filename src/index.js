import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import CommandInput from './CommandInput.js'
import Status from './Status.js'
import Sidebar from './Sidebar.js'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            isLoaded: false,
            screen: 1,
            items: []
        }

        this.handleClick = this.handleClick.bind(this);
    }

    messagesEnd = React.createRef();

    handleClick(a) {
        console.log(a);
        this.setState({screen: a});
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.callAPI(),
            1000
        );
        this.scrollToBottom();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
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

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }

    render() {
        const {items} = this.state;

        if (this.error) {
            return (
                <div className='loading'>
                    Loading...
                </div>
            )
        }
        if(parseInt(this.state.screen) === 1) {
            return (
                <div className='wrapper'>
                    <Sidebar handleClick={this.handleClick}/>
                    <div className='commandWrapper'>
                        <div className='commandbox'>
                            {items.map(item => (
                                <div className='command' key={item.id}>
                                    {item.data}
                                </div>
                            ))}
                            <div ref={(el) => { this.messagesEnd = el; }}></div>
                        </div>
                        <CommandInput />
                    </div>
                </div>
            );
        }
        else if(parseInt(this.state.screen) === 2) {
            clearInterval(this.timerID);
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