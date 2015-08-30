import './_item';

import React from 'react';
import BaseComponent from '../../../base-component';


class Item extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind();
    }
    render() {
        const
            {
                type,
                startTime,
                router,
                state
            } = this.props;
        let stateStr = (state === '0' || state === '') ? '準點' : `誤點${state}分鐘`;

        return (
            <li className="item" >
                <div className="item__heading">
                        <p>{type}</p>
                        <p>開往: {router} </p>
                </div>
                <div className="item__body">
                    <p className="item__time">
                        <small className="item__small">時間：</small>
                        <time dateTime={startTime}>{startTime}</time>
                    </p>
                </div>
                <div className="item__footer">
                    <p>
                        {stateStr}
                    </p>
                </div>
            </li>
        );
    }
}

Item.propTypes = {
    type     : React.PropTypes.string.isRequired,
    startTime: React.PropTypes.string.isRequired,
    router   : React.PropTypes.string.isRequired,
    state    : React.PropTypes.string.isRequired
};

export default Item;
