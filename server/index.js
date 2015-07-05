require('node-jsx').install();

import express from 'express';
import opn from 'opn';
import React from 'react';
import DefaultPage from './default-page';
import bundle from'./webpack-server';

let app = express();

bundle();

let renderPage = (entryPath) => {
    return React.renderToString(
                React.createElement(
                    DefaultPage,
                    {jsPath: entryPath}
                )
            )
}

app.get('/', (req, res) => {
   res.end(renderPage('//localhost:8080/build/index.js'));
});


app.listen(3000, () => {
   opn('http://localhost:3000');
} );
