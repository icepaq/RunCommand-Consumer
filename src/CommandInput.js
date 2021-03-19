import React from 'react';

class CommandInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            code: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        console.log(this.state.value);
    }

    handleClick(event) {
        console.log('Running Command');
        const url = "http://localhost:8080/runcommand?api_key=NEWAPIKEY&commands=";
        fetch(url + this.state.value)
        .then(res => res.json())
            .then(
                (result) => {
                    console.log('Result: ' + result.pid);
                    this.setState({
                        code: result.pid
                    }, () => {this.props.updateCodes(this.state.code)});
                }
            );
    }

    render() {
        return (
            <div className='runCommand'>
                <input className='inputbox' type='text' value={this.state.value} onChange={this.handleChange}/>
                <button className='submitbutton' onClick={this.handleClick}>Submit</button>
            </div>
        );
    }
}

export default CommandInput;