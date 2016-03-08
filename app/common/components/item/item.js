import './_item';

import React, { PropTypes } from 'react';
import BaseComponent from 'base-component';

let ThsrcItem = ({props}) => (
    <div className="item__inner">
        <div className="item__heading">
                <p>車次</p>
                <p>{props.trainType} </p>
        </div>
        <div className="item__body">
            <p className="item__time">
                <small className="item__small">時間：</small>
                <time dateTime={props.startTime}>{props.startTime}</time>
            </p>
        </div>
    </div>
);

let TwtrafficItem = ({props}) => (
    <div className="item__inner">
        <div className="item__heading">
                <p>{props.trainType}</p>
                <p>開往: {props.router} </p>
        </div>
        <div className="item__body">
            <p className="item__time">
                <small className="item__small">時間：</small>
                <time dateTime={props.startTime}>{props.startTime}</time>
            </p>
        </div>
        <div className="item__footer">
            <p>
                {(props.state === '0' || props.state === '') ? '準點' : `誤點${props.state}分鐘`}
            </p>
        </div>
    </div>
);

class Item extends BaseComponent {
    constructor(props) {
        super(props);
    }
    render() {
        let contentHtml = this.props.type === 'twtraffic' ? <TwtrafficItem  props={this.props} /> : <ThsrcItem props={this.props} />;

        return (
            <li className="item" >
                {contentHtml}
            </li>
        );
    }
}

Item.propTypes = {
    type     : PropTypes.string,
    trainType: PropTypes.string,
    startTime: PropTypes.string,
    router   : PropTypes.string,
    state    : PropTypes.string
};
Item.defaultProps = {
    type     : 'twtraffic',
    trainType: '',
    startTime: '',
    router   : '',
    state    : ''

};

export default Item;
