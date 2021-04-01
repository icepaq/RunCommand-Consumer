import React from 'react';

class Selections extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            content: []
        }

        console.log(this.state.content);

        this.handleClick = this.handleClick.bind(this);
        this.clear = this.clear.bind(this);
    }

    handleClick(e) {

        if (e.target.innerHTML === "Clear Selections") {
            this.clear();
        }
        else {
            this.props.setAPIQuery(e.target.innerHTML);
        }
    }

    clear() {
        this.props.clearAPIQuery();
    }

    render() {

        var temp = []
        temp.push(<div className='selection' id='clear'>Clear Selections</div>);

        for (var i = 0; i < this.props.codes.length; i ++) {
            var styling = {
                backgroundColor: "hsl(" + 50 * i + "deg, 100%, 65%)"
            };

            temp.push(<div className='selection' style={styling} id={this.props.codes[i]}>{this.props.codes[i]}</div>);
        }



        /*
                    <div className='clear' onClick={this.clear}>
                        Clear
                    </div>
        */
        return (
            <div className='selections' onClick={this.handleClick}>
                    {temp}
            </div>
        );
    }
}

export default Selections;