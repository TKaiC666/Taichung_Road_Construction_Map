import React from 'react';
import ReactDOM from 'react-dom';
import TaichungRCIApp from './component/TaichungRCIApp';
import './index.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

ReactDOM.render(
    <React.StrictMode>
        <TaichungRCIApp/>
    </React.StrictMode>
    ,
    document.getElementById('root')
);