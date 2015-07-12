import React from 'react';

class DefaultPage extends React.Component {

    render() {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <title>react server rendering</title>
                    <meta name="description" content="" />
                    <meta name="viewport" content="width=device-width" />
                </head>
                <body>
                    <div id="content"></div>
                    <script src="//localhost:8080/build/common.js"></script>
                    <script src={this.props.jsPath}></script>
                </body>
            </html>
        );
    }
};

export default DefaultPage;
