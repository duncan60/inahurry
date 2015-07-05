import React from 'react';
import BaseComponent from '../base-component';
import CommonChild from '../common/common-child';
class Page extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind();
    }
    render() {
        return (
            <div>
                Hello INDEX!!!
                <CommonChild />
            </div>
        );
    }
}

export default Page;
