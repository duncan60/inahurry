import React from 'react';

class DefaultPage extends React.Component {

    render() {
        return (
            <html lang="zh-TW">
                <head>
                    <meta charSet="utf-8" />
                    <title>特搜時刻表</title>
                    <meta name="viewport" content="width=device-width" />
                    <meta name="description" content="你是急急忙忙的通勤族嗎？利用定位分析出距離最近的車站，快速幫你搜尋鐵路時刻表資訊，讓你當個不疾不徐的通勤族" />
                    <meta property="og:site_name" content="特搜時刻表" />
                    <meta property="og:type" content="article" />
                    <meta property="og:locale" content="zh_TW" />
                    <meta property="og:url" content="http://inahurry.com.tw/" />
                    <meta property="og:title" content="特搜時刻表" />
                    <meta property="og:description" content="你你是急急忙忙的通勤族嗎？利用定位分析出距離最近的車站，快速幫你搜尋鐵路時刻表資訊，讓你當個不疾不徐的通勤族" />
                    <meta property="article:author" content="https://github.com/duncan60" />
                    <meta property="article:section" content="javascript" />
                    <link href='http://fonts.googleapis.com/css?family=Roboto+Mono:400,300italic' rel='stylesheet' type='text/css' />
                    <link href={this.props.stylePath} rel='stylesheet' type='text/css' />
                </head>
                <body>
                    <div className="site-top">
                        <h1 className="site-top__title">特搜時刻表</h1>
                    </div>
                    <main id="content" className="content-wrapper" role="main"></main>
                    <script src={this.props.commonPath}></script>
                    <script src={this.props.jsPath}></script>
                </body>
            </html>
        );
    }
}

DefaultPage.propTypes = {
    commonPath: React.PropTypes.string.isRequired,
    jsPath    : React.PropTypes.string.isRequired,
    stylePath : React.PropTypes.string.isRequired
};

export default DefaultPage;
