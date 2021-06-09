import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import TestApp from './component/TestApp';
import './index.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

ReactDOM.render(
    <TestApp/>,
    document.getElementById('root')
);