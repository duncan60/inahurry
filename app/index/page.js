import React from 'react';
import BaseComponent from '../base-component';
import Item from '../common/item';

//store
import TrainTimeTableStore from '../stores/train-timetable-store';

//actions
import TrainTimetableActions from '../actions/train-timetable-actions';

let getStore = () => {
    return {
        trainsTimetable: TrainTimeTableStore.getTrainsTimetable(),
        closestTrains  : TrainTimeTableStore.getClosestTrains(),
        dataReady      : TrainTimeTableStore.getDataReady()
    }
}
class Page extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind(
            '_getGeolocation',
            '_storeChange',
            '_renderItems',
            '_renderHeader'
        );
        this.state = getStore();;
    }
    componentWillMount() {
        this._getGeolocation();
    }
    componentDidMount() {
        TrainTimeTableStore.addChangeListener(this._storeChange);
    }
    componentWillUnmount() {
        TrainTimeTableStore.removeChangeListener(this._storeChange);
    }
    _renderHeader() {
        if(!this.state.dataReady) {
            return '';
        }
        const {targetStation} = this.state.closestTrains;
        return (
            <div>
                <p>最接近: {targetStation.name}火車站</p>
                <p>距離: {targetStation.dist} 公里</p>
            </div>
        );
    }
    _renderItems() {
        if(!this.state.dataReady) {
            return '';
        }
        const {south, north} = this.state.trainsTimetable;
        let southItems, northItems;
        southItems = south.map((item, i) => {
            return (
                <Item key={i} type={item.type} startTime={item.startTime} router={item.router} />
            );
        });
        northItems = north.map((item, i) => {
            return (
                <Item key={i} type={item.type} startTime={item.startTime} router={item.router} />
            );
        });
        return (
            <div>
                <p>北上列車</p>
                <ul>
                    {northItems}
                </ul>
                <p>南下列車</p>
                 <ul>
                    {southItems}
                </ul>
            </div>
        );
    }
    _storeChange() {
        this.setState(getStore());
        console.log('state', this.state);
    }
    _getGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                TrainTimetableActions.getTrainTimetable(position.coords.latitude, position.coords.longitude);
            });
        } else {
            alert('無法使用定位，請允許瀏覽器開啟定位功能');
        }
    }
    render() {
        let lists  = this._renderItems();
        let header = this._renderHeader();
        return (
            <div>
                {header}
                {lists}
            </div>
        );
    }
}

export default Page;
