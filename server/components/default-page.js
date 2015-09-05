import React from 'react';
import TabButton from './tab-button';
import classNames from 'classnames';

class DefaultPage extends React.Component {
    _renderTab() {
        return this.props.tabData.map((item, i) => {
            let itemClasses = classNames('nav-tab__item', {'nav-tab__item--active': item.router === this.props.activeRouter});
            return (
                <li key={i} className={itemClasses}>
                    <TabButton
                        router={item.router}
                        name={item.name} />
                </li>
            );
        });
    }
    render() {
        let tabHtml = this._renderTab();
        return (
            <html lang="zh-TW">
                <head>
                    <meta charSet="utf-8" />
                    <title>特搜時刻表</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
                    <meta name="description" content="你是急急忙忙的通勤族嗎？到了車站才發現趕不上列車！特搜時刻表利用定位分析出距離最近的車站，快速幫你搜尋台灣鐵路時刻表及台灣高鐵時刻表資訊，讓你當個不疾不徐的通勤族" />
                    <meta property="og:site_name" content="特搜時刻表" />
                    <meta property="og:type" content="article" />
                    <meta property="og:locale" content="zh_TW" />
                    <meta property="og:url" content="http://inahurry.com.tw/" />
                    <meta property="og:title" content="特搜時刻表" />
                    <meta property="og:image" content="http://inahurry.com.tw/assets/images/apple-icon-114x114.png">
                    <meta property="og:description" content="你是急急忙忙的通勤族嗎？到了車站才發現趕不上列車！特搜時刻表利用定位分析出距離最近的車站，快速幫你搜尋台灣鐵路時刻表及台灣高鐵時刻表資訊，讓你當個不疾不徐的通勤族" />
                    <meta property="article:author" content="https://github.com/duncan60" />
                    <meta property="article:section" content="javascript" />
                    <link href="./assets/images/apple-icon-57x57.png" rel="apple-touch-icon-precomposed" sizes="57x57" />
                    <link href="./assets/images/apple-icon-72x72.png" rel="apple-touch-icon-precomposed" sizes="72x72" />
                    <link href="./assets/images/apple-icon-114x114.png" rel="apple-touch-icon-precomposed" sizes="114x114" />
                    <link href="./assets/images/apple-icon-144x144.png" rel="apple-touch-icon-precomposed" sizes="144x144" />
                    <link href='http://fonts.googleapis.com/css?family=Roboto+Mono:400,300italic' rel='stylesheet' type='text/css' />
                    <link href={this.props.stylePath} rel='stylesheet' type='text/css' />
                </head>
                <body>
                    <header className="site-top" role="banner">
                        <h1 className="site-top__title">特搜時刻表</h1>
                    </header>
                    <nav>
                        <ul className='nav-tab'>
                            {tabHtml}
                        </ul>
                    </nav>
                    <main id="content" className="content-wrapper" role="main"></main>
                    <script src={this.props.commonPath}></script>
                    <script src={this.props.jsPath}></script>
                </body>
            </html>
        );
    }
}

DefaultPage.propTypes = {
    commonPath  : React.PropTypes.string.isRequired,
    jsPath      : React.PropTypes.string.isRequired,
    stylePath   : React.PropTypes.string.isRequired,
    activeRouter:React.PropTypes.string.isRequired,
    tabData     : React.PropTypes.array.isRequired
};

export default DefaultPage;
