import React from 'react';
import BaseComponent from '../base-component';

class Item extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind();
    }
    render() {
        const {type, startTime} = this.props;
        return (
            <div className="item">
                車種：<span>type</span> 發車時間: <span>startTime </span> 路線: <span>router </span>
            </div>
        );
    }
}

Item.propTypes = {
    type     : React.PropTypes.string.isRequired,
    startTime: React.PropTypes.string.isRequired,
    router   : React.PropTypes.string.isRequired
};


export default Item;

