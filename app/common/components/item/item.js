import './_item';

import React from 'react';
import BaseComponent from '../../../base-component';


class Item extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind();
    }
    _renderThsrcItem() {
        const
            {
                startTime,
                trainType
            } = this.props;

        return (
            <div className="item__inner">
                <div className="item__heading">
                        <p>車次</p>
                        <p>{trainType} </p>
                </div>
                <div className="item__body">
                    <p className="item__time">
                        <small className="item__small">時間：</small>
                        <time dateTime={startTime}>{startTime}</time>
                    </p>
                </div>

            </div>
        );
    }
    _renderTwtrafficItem() {
        const
            {
                trainType,
                startTime,
                router,
                state
            } = this.props;
        let stateStr = (state === '0' || state === '') ? '準點' : `誤點${state}分鐘`;

        return (
            <div className="item__inner">
                <div className="item__heading">
                        <p>{trainType}</p>
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
            </div>
        );
    }
    render() {
        let contentHtml = this.props.type === 'twtraffic' ? this._renderTwtrafficItem() : this._renderThsrcItem();

        return (
            <li className="item" >
                {contentHtml}
            </li>
        );
    }
}

Item.propTypes = {
    type     : React.PropTypes.string,
    trainType: React.PropTypes.string,
    startTime: React.PropTypes.string,
    router   : React.PropTypes.string,
    state    : React.PropTypes.string
};
Item.defaultProps = {
    type     : 'twtraffic',
    trainType: '',
    startTime: '',
    router   : '',
    state    : ''

};

export default Item;
