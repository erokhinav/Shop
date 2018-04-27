import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './components/App';
import { Provider } from "react-redux";
import store from "./redux/store";

const connect = require('vkui-connect');
connect.send('VKWebAppInit');

ReactDOM.render(
    <Provider store={store} connect={connect}>
        <App />
    </Provider>,
    document.getElementById('root')
);