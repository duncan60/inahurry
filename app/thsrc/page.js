import React from 'react/addons';
import BaseComponent from '../base-component';

class Page extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind(
            '_getGeolocation'
        );

    }
    componentWillMount() {
        if (navigator.userAgent.match(/FB/) !== null) {
            /*eslint-disable */
            alert('建議使用safair瀏覽，確保能使用使服務！');
        }
        this._getGeolocation();
    }
    componentDidMount() {
        TrainTimeTableStore.addChangeListener(this._storeChange);
    }
    componentWillUnmount() {
        TrainTimeTableStore.removeChangeListener(this._storeChange);
    }

    _getGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                //TrainTimetableActions.getTrainTimetable(position.coords.latitude, position.coords.longitude);
                console.log('position', position);
            });
        } else {
            /*eslint-disable */
            alert('無法使用定位，請允許瀏覽器開啟定位功能');
        }
    }
    render() {


        return (
            <div className="content-inner">
                thsrc
            </div>
        );
    }
}

export default Page;
