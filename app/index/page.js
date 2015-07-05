import React from 'react';
import BaseComponent from '../base-component';
import CommonChild from '../common/common-child';
class Page extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind(
            '_getGeolocation'
        );
        this.state = {
            latitude : 0,
            longitude: 0
        }
    }
    componentWillMount() {
        this._getGeolocation();
    }
    _getGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    latitude : position.coords.latitude,
                    longitude: position.coords.longitude
                });
            });
        } else {

        }
    }
    render() {
        return (
            <div>
                <p>latitude : {this.state.latitude}</p>
                <p>longitude: {this.state.longitude}</p>
                <CommonChild />
            </div>
        );
    }
}

export default Page;
