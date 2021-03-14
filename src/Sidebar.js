import React from 'react';


class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        console.log('Sidebar.handleClick(a): ' + e);
        this.props.handleClick(e.target.innerHTML);
    }

    render() {
        return (
            <div className='sidebar'>
                <div className='item' onClick={this.handleClick}>1</div>
                <div className='item' onClick={this.handleClick}>2</div>
                <div className='item' onClick={this.handleClick}>3</div>
                <div className='item' onClick={this.handleClick}>4</div>
                <div className='item' onClick={this.handleClick}>5</div>
            </div>
        )
    }
}

export default Sidebar;