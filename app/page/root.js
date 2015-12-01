import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Page from 'common/container/page';

export default class Root extends Component {
  render() {
    const { store, routerType } = this.props;
    return (
        <Provider store={store}>
            <Page routerType={routerType} store={store} />
        </Provider>
    );
  }
}

Root.propTypes = {
  store     : PropTypes.object.isRequired,
  routerType: PropTypes.object.string
};
