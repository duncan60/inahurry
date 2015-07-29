
import React from 'react';
import BaseComponent from '../base-component';

//components
import Item from '../common/components/item/item';
import Loading from '../common/components/loading/loading';

//store
import TrainTimeTableStore from '../stores/train-timetable-store';

//actions
import TrainTimetableActions from '../actions/train-timetable-actions';

let getStore = () => {
    return {
        trainsTimetable: TrainTimeTableStore.getTrainsTimetable(),
        closestTrains  : TrainTimeTableStore.getClosestTrains(),
        dataReady      : TrainTimeTableStore.getDataReady()
    };
};
class Page extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind(
            '_getGeolocation',
            '_storeChange',
            '_renderList',
            '_renderItems',
            '_renderHeaderInfo',
            '_renderNotHasTrains',
            '_renderLoading'
        );
        this.state = getStore();
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
    }
    _getGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                TrainTimetableActions.getTrainTimetable(position.coords.latitude, position.coords.longitude);
            });
        } else {
            /*eslint-disable */
            alert('無法使用定位，請允許瀏覽器開啟定位功能');
        }
    }
    _renderLoading() {
        if (this.state.dataReady) {
            return ;
        }
        return (
            <Loading />
        );
    }
    _renderHeaderInfo() {
        if (!this.state.dataReady) {
            return ;
        }
        const {targetStation} = this.state.closestTrains;

        return (
            <p className="header__subsection">
                <small className="header__subsection--small">距離 </small>{targetStation.name}火車站
                <small className="header__subsection--small">約 {(+targetStation.dist).toFixed(2)} Km</small>
            </p>
        );
    }
    _renderNotHasTrains() {
        return (
            <li className="item">
                <div className="item__heading">
                    <p>目前沒有任何列車</p>
                </div>
            </li>
        );
    }
    _renderItems(items) {
        if (items.length === 0) {
            return this._renderNotHasTrains();
        }
        return items.map((item, i) => {
            return (
                <Item key={i} type={item.type} startTime={item.startTime} router={item.router} />
            );
        });
    }
    _renderList() {
        if (!this.state.dataReady) {
            return ;
        }
        const {south, north} = this.state.trainsTimetable;
        let northItems = this._renderItems(north),
            southItems = this._renderItems(south);

        return (
            <div className="list-section__inner">
                <div className="list-wrapper north-list">
                    <p className="list-title"><span className="icon-train" />北上列車</p>
                    <ul className="list-group">
                        {northItems}
                    </ul>
                </div>
                <div className="list-wrapper south-list">
                    <p className="list-title"><span className="icon-train" />南下列車</p>
                    <ul className="list-group">
                        {southItems}
                    </ul>
                </div>
            </div>
        );
    }
    render() {
        let headerInfo = this._renderHeaderInfo(),
            loading    = this._renderLoading(),
            list       = this._renderList();

        return (
            <div className="content-inner">
                <header className="header">
                    <div className="header__inner">
                        <h2 className="header__title">台鐵時刻表</h2>
                        {headerInfo}
                    </div>
                </header>
                <section className="list-section">
                    {loading}
                    {list}
                </section>
                <footer className="footer">
                    <p>資料來源：交通部台灣鐵路管理局 列車時刻查詢系統</p>
                </footer>
            </div>
        );
    }
}

export default Page;
