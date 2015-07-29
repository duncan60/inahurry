import './_item';

import React from 'react/addons';
import BaseComponent from '../../../base-component';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class Item extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind();
    }
    render() {
        const {type, startTime, router} = this.props;
        return (
            <ReactCSSTransitionGroup transitionName="item" transitionAppear={true}>
                <li className="item" >
                    <div className="item__heading">
                        <div>
                            <p>{type}</p>
                            <p>{router} </p>
                        </div>
                    </div>
                    <div className="item__body">
                        <p className="item__body--time">
                            <small className="item__body--small">時間：</small>
                            <time dateTime={startTime}>{startTime}</time>
                        </p>
                    </div>
                </li>
            </ReactCSSTransitionGroup>
        );
    }
}

Item.propTypes = {
    type     : React.PropTypes.string.isRequired,
    startTime: React.PropTypes.string.isRequired,
    router   : React.PropTypes.string.isRequired
};

export default Item;
