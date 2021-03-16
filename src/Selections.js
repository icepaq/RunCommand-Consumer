import React from 'react';

class Selections extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            content: []
        }

        console.log(this.state.content);
    }
    render() {

        var temp = []
        temp.push(<div className='selection' id='null'>Null</div>);

        for (var i = 0; i < this.props.codes.length; i ++) {
            temp.push(<div className='selection' id={this.props.codes[i]}>{this.props.codes[i]}</div>);
        }

        return (
            <div className='selections'>
                {temp}
            </div>
        );
    }
}

export default Selections