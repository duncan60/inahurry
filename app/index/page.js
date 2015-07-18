
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
            '_renderClosestStationInfo',
            '_renderNotHasTrains'
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
    _renderClosestStationInfo() {
        if (!this.state.dataReady) {
            return '';
        }
        const {targetStation} = this.state.closestTrains;

        return (
            <p className="subsection-headline">
                <span className="mini-fs">距離 </span>{targetStation.name}火車站
                <span className="mini-fs"> 約 {(+targetStation.dist).toFixed(2)} Km</span>
            </p>
        );
    }
    _renderNotHasTrains() {
        return (
            <li className="item">
                <div className="item-type">
                        <p>目前沒有任何列車</p>
                </div>
            </li>
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
        if(south.length === 0) {
            southItems = this._renderNotHasTrains();
        }
        if(north.length === 0) {
            northItems = this._renderNotHasTrains();
        }
        return (
            <div className="list-section-inner">
                <div className="list-wrapper north-list">
                    <p className="group-title">北上列車</p>
                    <ul className="list-group">
                        {northItems}
                    </ul>
                </div>
                <div className="list-wrapper south-list">
                    <p className="group-title">南下列車</p>
                    <ul className="list-group">
                        {southItems}
                    </ul>
                </div>
            </div>
        );
    }
    render() {
        let header = this._renderClosestStationInfo(),
            list  = this._renderItems();
        return (
            <div className="content-inner">
                <header className="info-header">
                    <div className="info-inner">
                        <h2 className="main-title">台鐵時刻表 </h2>
                        {header}
                    </div>
                </header>
                <section className="list-section">
                    {list}
                 </section>
                <footer className="footer">
                    <p className="mini-fs">資料來源：交通部台灣鐵路管理局 列車時刻查詢系統</p>
                </footer>
            </div>
        );
    }
}

export default Page;
