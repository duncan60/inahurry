import React from 'react';
import BaseComponent from 'base-component';
import withDecorators from 'decorators/withDecorators';
//components
import Item from 'common/components/item/item';
import Loading from 'common/components/loading/loading';

//redux

import { connect } from 'react-redux';
import { getTrainTimetable } from 'actions/train-timetable';

let HeaderInfo = ({type, station}) => (
    <p className="table-header__subsection">
        <small className="table-header__subsection--small">
            距離
        </small>
        {station.name}
        {type === 'twtraffic' ? '火車站' : ''}
        <small className="table-header__subsection--small">
            約 {(+station.dist).toFixed(2)} Km
        </small>
    </p>
);

let NotHasTrainsItem = () => (
    <li className="item">
        <div className="item__inner">
            <div className="item__heading">
                <p>目前沒有任何列車</p>
            </div>
        </div>
    </li>
);

let ListGroup = ({title, items}) => (
    <div className="list-wrapper south-list">
        <p className="list-title"><span className="icon-train" />{title}</p>
        <ul className="list-group">
            {items}
        </ul>
    </div>
);

@withDecorators
class Page extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind(
            '_getGeolocation',
            '_renderList',
            '_renderItems'
        );
    }
    componentWillMount() {
        if (navigator.userAgent.match(/FB/) !== null) {
            /*eslint-disable */
            alert('建議使用safari或Chrome瀏覽，確保能使用使服務！');
        }
        this._getGeolocation();
    }
    _getGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { dispatch } = this.props
                    dispatch(getTrainTimetable(position.coords.latitude, position.coords.longitude, this.props.routerType));
                },() => {
                    /*eslint-disable */
                    alert('無法使用定位，請設定瀏覽器開啟定位功能');
                });
        } else {
            /*eslint-disable */
            alert('無法使用定位，無法提供服務');
        }
    }
    _renderItems(items) {
        if (items.length === 0) {
            return <NotHasTrainsItem />;
        }
        if (this.props.routerType ==='twtraffic') {
            return items.map((item, i) => {
                return <Item
                        key={i}
                        type={this.props.routerType}
                        trainType={item.type}
                        startTime={item.startTime}
                        router={item.router}
                        state ={item.state} />;
            });
        } else {
            return items.map((item, i) => {
                return <Item
                        key={i}
                        type={this.props.routerType}
                        trainType={item.trainNumber}
                        startTime={item.departureTime} />;
            });
        }
    }
    _renderList() {
        const {south, north} = this.props.trainsTimetable;
        let northItems = this._renderItems(north),
            southItems = this._renderItems(south);

        return (
            <div className="list-section__inner">
                <ListGroup title={'北上列車'} items={northItems} />
                <hr className="group-line" />
                <ListGroup title={'南下列車'} items={southItems} />
            </div>
        );
    }
    render() {
        console.log('>>>>>>render conponent props', this.props);
        if (this.props.isError) {
            return <p className='error_txt'>連線錯誤，暫時無法提供服務...</p>;
        }
        if (!this.props.isReady) {
            return <Loading />;
        }
        let listHtml = this._renderList(),
            title    = this.props.routerType === 'twtraffic' ? '台鐵時刻表' : '高鐵時刻表',
            source   = this.props.routerType === 'twtraffic' ? '交通部台灣鐵路管理局 列車時刻查詢系統' : '台灣高速鐵路股份有限公司 表定最近車次';

        return (
            <div className="content-inner">
                <div className="table-header">
                    <div className="table-header__inner">
                        <h2 className="table-header__title">{title}</h2>
                        <HeaderInfo type={this.props.routerType} station={this.props.closestStation} />
                    </div>
                </div>
                <section className="list-section">
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

function mapStateToProps(state) {
    console.log('mapStateToProps');
    const {
        serverError,
        trainTimetable
    } = state,
    {
        isError
    } = serverError,
    {
        trainsTimetableData,
        closestStation,
        isReady
    } = trainTimetable;
    return {
        trainsTimetableData,
        closestStation,
        isReady,
        isError
    }
}
//export default Page;
export default connect(mapStateToProps)(Page);
