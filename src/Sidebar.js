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
                <div className='sidebarlogo'></div>
                <div className='item' onClick={this.handleClick}>Overview</div>
                <div className='item' onClick={this.handleClick}>Console</div>
                <div className='item' onClick={this.handleClick}>Plugin Manager</div>
                <div className='item' onClick={this.handleClick}>File Explorer</div>
                <div className='item' onClick={this.handleClick}>Backups</div>
            </div>
        )
    }
}

export default Sidebar;