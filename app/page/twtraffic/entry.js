import 'babel-core/polyfill';
import 'normalize.css';
import 'assets/fonts-style';
import 'assets/main';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import appStore from 'stores/AppStore';
import Page from 'common/container/page';

const store = appStore();

ReactDOM.render(
    <Provider store={store}>
        <Page routerType={'twtraffic'} />
    </Provider>
    , document.getElementById('content'));
