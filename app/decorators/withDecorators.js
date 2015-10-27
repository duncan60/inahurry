import React, { Component } from 'react';

let withDecorators = (ComponentComponent) => {
    return class WithDecorators extends Component {
        render() {
                return (
                    <ComponentComponent {...this.props} />
                );
            }
    };
};

export default withDecorators;
