import React from 'react';
import ReactDOM from 'react-dom';

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
        fetch("http://localhost:8080/runcommand?api_key=NEWAPIKEY&commands=" + this.state.value);
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

export default CommandInput;