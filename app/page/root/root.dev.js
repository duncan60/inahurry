import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Page from 'common/container/page';
import DevTools from './dev-tools';

import configureStore from 'stores/configureStore';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
        <Provider store={store}>
            <div>
                <Page routerType={this.props.routerType} />
                <DevTools />
            </div>
        </Provider>
    );
  }
}

Root.propTypes = {
  routerType: PropTypes.string
};
