import React from 'react';

class TabButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <a href={this.props.router} >
                {this.props.name}
            </a>
        );
    }
}

TabButton.propTypes = {
    name  : React.PropTypes.string.isRequired,
    router: React.PropTypes.string.isRequired
};

export default TabButton;
