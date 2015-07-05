import React from 'react';
import BaseComponent from '../base-component';

class CommonChild extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind();
    }
    render() {
        return (
            <div className="common-child">
                I am a CommonChild
            </div>
        );
    }
}
export default CommonChild;

