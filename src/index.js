import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './components/App';
import { Provider } from "react-redux";
import store from "./redux/store";

const connect = require('vkui-connect');
connect.send('VKWebAppInit');
connect.send('VKWebAppGetAuthToken', {"app_id": 6458026, "scope": "video"});

connect.subscribe(function(e) {
    e = e.detail;
    console.log('EVENT');
    console.log(e);
});

ReactDOM.render(
    <Provider store={store}>
        <App connect={connect}/>
    </Provider>,
    document.getElementById('root')
);