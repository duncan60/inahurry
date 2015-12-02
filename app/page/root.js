import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Page from 'common/container/page';

import appStore from 'stores/AppStore';

const store = appStore();

export default class Root extends Component {
  render() {
    return (
        <Provider store={store}>
            <Page routerType={this.props.routerType} />
        </Provider>
    );
  }
}

Root.propTypes = {
  routerType: PropTypes.string
};
