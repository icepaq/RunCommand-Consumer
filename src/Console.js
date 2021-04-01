import React from 'react';

import Sidebar from './Sidebar.js'
import Selections from './Selections.js'
import CommandInput from './CommandInput.js'


class Console extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            error: false,
            isLoaded: false,
            screen: 1,
            url: "http://localhost:8080/getoutput?api_key=NEWAPIKEY",
            items: [],
            codes: []
        }

        this.handleClick = this.handleClick.bind(this);
        this.click = this.click.bind(this);
        this.testFunction = this.testFunction.bind(this);
        this.updateCodes = this.updateCodes.bind(this);
        this.setAPIQuery = this.setAPIQuery.bind(this);

        this.clearAPIQuery = this.clearAPIQuery.bind(this);
    }

    messagesEnd = React.createRef();

    updateCodes(a) {
        console.log('A value: ' + a);
        this.state.codes.push(a);
        this.setState({codes: this.state.codes});
        console.log(this.state.codes);
    }

    click() {
        console.log('click');
    }

    handleClick(a) {
        console.log(a);
        this.setState({screen: a});
    }

    componentDidMount() {

        this.callAPI();
        this.timerID = setInterval(
            () => this.callAPI(),
            2000
        );
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    callAPI() {
        console.log('Calling API');
        console.log(this.state.url);
        fetch(this.state.url)
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

    testFunction() {
        console.log('Test function');
    }

    setAPIQuery(filter) {
        this.setState({url: "http://localhost:8080/getoutput?api_key=NEWAPIKEY&pid=" + filter});
    }

    clearAPIQuery() {
        this.setState({url: "http://localhost:8080/getoutput?api_key=NEWAPIKEY"});
    }

    render() {

        const {items} = this.state;
        return (
            <div className='wrapper'>
                <Sidebar handleClick={this.handleClick}/>
                <div className='commandWrapper'>
                    <div className='commandbox'>
                        {items.map(item => (
                            <div className='command' key={item.id}>
                                <div className='commandtext'>
                                    {item.date}
                                </div>
                                <div className='commandtext'>
                                    {item.data}
                                </div>
                                
                            </div>
                        ))}
                        <div ref={(el) => { this.messagesEnd = el; }}></div>
                    </div>
                    <CommandInput updateCodes={this.updateCodes} />
                </div>
                <Selections codes={this.state.codes} setAPIQuery={this.setAPIQuery} clearAPIQuery={this.clearAPIQuery}/>
            </div>
        );
    }
    
    
}

export default Console;