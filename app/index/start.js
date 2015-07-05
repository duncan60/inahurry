import React from 'react';
import BaseComponent from '../base-component';
import Page from './page';

class Start extends BaseComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="start">
                <Page />
            </div>
        );
    }
}

export default Start;

