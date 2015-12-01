import 'babel-core/polyfill';
import 'normalize.css';
import 'assets/fonts-style';
import 'assets/main';

import React from 'react';
import ReactDOM from 'react-dom';
import appStore from 'stores/AppStore';
import Root from 'page/root';

const store = appStore();

ReactDOM.render(
    <Root routerType={'thsrc'} store={store} />
    , document.getElementById('content'));

