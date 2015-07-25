import './_item';

import React from 'react';
import BaseComponent from '../../../base-component';

class Item extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind();
    }
    render() {
        const {type, startTime, router} = this.props;
        return (
            <li className="item">
                <div className="item__heading">
                    <div>
                        <p>{type}</p>
                        <p>{router} </p>
                    </div>
                </div>
                <div className="item__body">
                    <p className="item__body--time"><span className="item__body--mini-fs">時間：</span>{startTime}</p>
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
