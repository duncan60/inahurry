import './_loading';

import React from 'react';
import BaseComponent from '../../../base-component';

class Loading extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind();
    }
    render() {
        return (
            <div className="loading">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
        );
    }
}

export default Loading;
