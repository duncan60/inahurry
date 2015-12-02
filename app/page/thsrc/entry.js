import 'babel-core/polyfill';
import 'normalize.css';
import 'assets/fonts-style';
import 'assets/main';

import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'page/root';

ReactDOM.render(
    <Root routerType={'thsrc'} />
    , document.getElementById('content'));

