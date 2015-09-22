

import React from 'react';
import BaseComponent from '../../../base-component';

//components
import Item from '../../../common/components/item/item';
import Loading from '../../../common/components/loading/loading';

//store
import TrainTimeTableStore from '../../../stores/train-timetable-store';

//actions
import TrainTimetableActions from '../../../actions/train-timetable-actions';


import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

let getStore = () => {
    return {
        trainsTimetable: TrainTimeTableStore.getTrainsTimetable(),
        closestStation : TrainTimeTableStore.getClosestTrains(),
        isReady        : TrainTimeTableStore.getReady(),
        isError        : TrainTimeTableStore.getError()
    };
};
class Page extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind(
            '_getGeolocation',
            '_storeChange',
            '_renderError',
            '_renderList',
            '_renderItems',
            '_renderHeaderInfo',
            '_renderNotHasTrains',
            '_renderLoading'
        );
        this.state = getStore();
    }
    componentWillMount() {
        if (navigator.userAgent.match(/FB/) !== null) {
            /*eslint-disable */
            alert('建議使用safari或Chrome瀏覽，確保能使用使服務！');
        }
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
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    TrainTimetableActions.getTrainTimetable(position.coords.latitude, position.coords.longitude, this.props.routerType);
                },() => {
                    /*eslint-disable */
                    alert('無法使用定位，請設定瀏覽器開啟定位功能');
                });
        } else {
            /*eslint-disable */
            alert('無法使用定位，無法提供服務');
        }
    }
    _renderError() {
        if (!this.state.isError) {
            return ;
        }
        return (
            <p className='error_txt'>連線錯誤，暫時無法提供服務...</p>
        );
    }
    _renderLoading() {
        if (this.state.isReady || this.state.isError) {
            return ;
        }
        return (
            <Loading />
        );
    }
    _renderHeaderInfo() {
        if (!this.state.isReady) {
            return ;
        }
        const {targetStation} = this.state.closestStation;
        let trainType = this.props.routerType === 'twtraffic' ? '火車站' : '';
        return (
            <p className="header__subsection">
                <small className="header__subsection--small">距離 </small>{targetStation.name}{trainType}
                <small className="header__subsection--small"> 約 {(+targetStation.dist).toFixed(2)} Km</small>
            </p>
        );
    }
    _renderNotHasTrains() {
        return (
            <li className="item">
                <div className="item__inner">
                    <div className="item__heading">
                        <p>目前沒有任何列車</p>
                    </div>
                </div>
            </li>
        );
    }
    _renderItems(items) {
        if (items.length === 0) {
            return this._renderNotHasTrains();
        }
        if (this.props.routerType ==='twtraffic') {
            return items.map((item, i) => {
                return (
                    <Item
                        key={i}
                        type={this.props.routerType}
                        trainType={item.type}
                        startTime={item.startTime}
                        router={item.router}
                        state ={item.state} />
                );
            });
        } else {
            return items.map((item, i) => {
                return (
                    <Item
                        key={i}
                        type={this.props.routerType}
                        trainType={item.trainNumber}
                        startTime={item.departureTime} />
                );
            });
        }
    }
    _renderList() {
        if (!this.state.isReady) {
            return ;
        }
        const {south, north} = this.state.trainsTimetable;
        let northItems = this._renderItems(north),
            southItems = this._renderItems(south);

        return (
            <div className="list-section__inner">
                <div className="list-wrapper north-list">
                    <p className="list-title"><span className="icon-train" />北上列車</p>
                    <ReactCSSTransitionGroup component="ul" className="list-group" transitionName="item" transitionAppear={true} transitionEnterTimeout={500}>
                        {northItems}
                    </ReactCSSTransitionGroup>
                </div>
                <hr className="group-line" />
                <div className="list-wrapper south-list">
                    <p className="list-title"><span className="icon-train" />南下列車</p>
                    <ReactCSSTransitionGroup component="ul" className="list-group" transitionName="item" transitionAppear={true} transitionEnterTimeout={500}>
                        {southItems}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }
    render() {
        let headerInfoHtml = this._renderHeaderInfo(),
            loadingHtml    = this._renderLoading(),
            listHtml       = this._renderList(),
            errorHtml      = this._renderError(),
            title          = this.props.routerType === 'twtraffic' ? '台鐵時刻表' : '高鐵時刻表',
            source         = this.props.routerType === 'twtraffic' ? '交通部台灣鐵路管理局 列車時刻查詢系統' : '台灣高速鐵路股份有限公司 表定最近車次';

        return (
            <div className="content-inner">
                <div className="table-header">
                    <div className="header__inner">
                        <h2 className="header__title">{title}</h2>
                        {headerInfoHtml}
                    </div>
                </div>
                <section className="list-section">
                    {errorHtml}
                    {loadingHtml}
                    {listHtml}
                </section>
                <footer className="footer">
                    <p>資料來源：{source}</p>
                </footer>
            </div>
        );
    }
}

Page.propTypes = {
    routerType: React.PropTypes.string,
};

Page.defaultProps = {
    routerType: 'twtraffic',
};

export default Page;
