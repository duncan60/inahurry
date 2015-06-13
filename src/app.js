import './assets/styles/app.scss';

import React from 'react';


class App extends React.Component {
	componentDidMount() {
		navigator.geolocation.watchPosition((position) => {
			console.table(position);
		});
	}
    render() {
        return (
        	<div >
               react
            </div>
        );
    }
}
React.render(<App />, document.body);
