import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Page from 'common/container/page';
import configureStore from 'stores/configureStore';

const store = configureStore();

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
  routerType: React.PropTypes.string
};
