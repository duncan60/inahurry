import React from 'react';
import BaseComponent from '../base-component';

class Item extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind();
    }
    render() {
        const {type, startTime, router} = this.props;
        return (
            <li className="item">
                <div className="item-type">
                    <p>{type}</p>
                </div>
                <div className="item-info">
                    <p className="item-path">{router} </p>
                    <p className="item-time">{startTime} </p>
                </div>
            </li>
        );
    }
}

Item.propTypes = {
    type     : React.PropTypes.string.isRequired,
    startTime: React.PropTypes.string.isRequired,
    router   : React.PropTypes.string.isRequired
};


export default Item;

