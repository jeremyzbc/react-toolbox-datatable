import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';

import 'react-toolbox/lib/commons.scss';
import 'material-design-icons/iconfont/material-icons.css';
import App from 'components/App';
import 'styles/global';

ReactDOM.render (
      <App />,
    document.getElementById("pagecontent")
);
