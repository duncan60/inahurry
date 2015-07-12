import React from 'react';
import BaseComponent from '../base-component';
import Item from '../common/item';

//store
import TrainTimeTableStore from '../stores/train-timetable-store';

//actions
import TrainTimetableActions from '../actions/train-timetable-actions';

let getStore = () => {
    return {
        trainsData: TrainTimeTableStore.getList(),
        dataReady : TrainTimeTableStore.getDataReady(),
    }
}
class Page extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind(
            '_getGeolocation',
            '_storeChange',
            '_renderItems'
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
    _renderItems() {
        if(!this.state.dataReady) {
            return '';
        }
        const {south, north} = this.state.trainsData;
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
                <p>北上</p>
                <ul>
                    {northItems}
                </ul>
                <p>南下</p>
                 <ul>
                    {southItems}
                </ul>
            </div>
        );
    }
    _storeChange() {
        this.setState(getStore());
    }
    _getGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                TrainTimetableActions.getTrainTimetable(position.coords.latitude, position.coords.longitude);
            });
        } else {

        }
    }
    render() {
        let lists = this._renderItems();

        return (
            <div>
                {lists}
            </div>
        );
    }
}

export default Page;
