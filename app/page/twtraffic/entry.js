import 'normalize.css';
import '../../assets/fonts-style';
import '../../assets/main';

import 'file?name=./images/[name].[ext]?[hash]!../../assets/images/apple-icon-57x57.png';
import 'file?name=./images/[name].[ext]?[hash]!../../assets/images/apple-icon-72x72.png';
import 'file?name=./images/[name].[ext]?[hash]!../../assets/images/apple-icon-114x114.png';
import 'file?name=./images/[name].[ext]?[hash]!../../assets/images/apple-icon-144x144.png';

import React from 'react';
import Page from '../../common/container/page/page';

React.render(<Page routerType={'twtraffic'} />, document.getElementById('content'));

/*eslint-disable */
if (location.hostname !== 'localhost') {
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-66833382-1', 'auto');
	ga('send', 'pageview');
}

