import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css'

class CommandInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        console.log(this.state.value);
    }

    submit(event) {
        console.log('Running Command');
        fetch("http://localhost:8080/runcommand?api_key=ABCDEFG&commands=" + this.state.value + "&command_id=");
    }

    render() {
        return (
            <div className='runCommand'>
                <input className='inputbox' type='text' value={this.state.value} onChange={this.handleChange}/>
                <button onClick={this.submit}>Submit</button>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            isLoaded: false,
            items: []
        }
    }

    messagesEnd = React.createRef();

    componentDidMount() {
        this.timerID = setInterval(
            () => this.callAPI(),
            1000
        );
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    callAPI() {
        console.log('Calling API');
        fetch("http://localhost:8080/getouput?api_key=ABCDEFG")
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
        return (
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
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);