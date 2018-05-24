import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import NavigationBar from './NavigationBar';
import Main from './Main';
import Cart from './Cart';
import ItemInfo from './ItemInfo';
import Category from './Category';
import PropTypes from "prop-types";
import { parse } from '../lib/yandex';
import { connect } from "react-redux";
import {goBack, goForward, setCategory, setCategoryIndex} from "../redux/actions";
import store from "../redux/store";

const mapStateToProps = state => {
    return {
        activePanel: state.activePanel,
        categoryIndex: state.categoryIndex,
        category: state.category,
        panelBack: state.panelBack,
        panelForward: state.panelForward,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCategoryIndex: index => dispatch(setCategoryIndex(index)),
        setCategory: category => dispatch(setCategory(category)),
        goForward: () => dispatch(goForward()),
        goBack: () => dispatch(goBack()),
    };
};

class ConnectedApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popout: null,
        };

        this.market = parse('/yandex.yml');

        this.mainCategories = this.formatMainCategories(this.market);
        let categories = this.mainCategories;
        for (let index in categories) {
            if (categories.hasOwnProperty(index)) {
                categories[index]['key'] = index;
            }
        }

        let minIndex = Object.keys(this.mainCategories)[0];
        this.props.setCategoryIndex(minIndex);
        this.props.setCategory(this.mainCategories[minIndex]);

        this.props.connect.subscribe(this.navigationListener.bind(this));
    }

    formatMainCategories(market) {
        let offers = market.offers;
        let categories = market.categories;
        let result = [];
        categories.forEach(function (element, index) {
            if (element.parentId == undefined) {
                result[index] = {offers: []};
            }
        });
        offers.forEach(function (element) {
            let id = element.categoryId;
            while (result[id] == undefined) {
                id = categories[id].parentId;
            }
            result[id].offers.push(element);
        });
        categories.forEach(function (element, index) {
            if (element.parentId == undefined) {
                result[index].name = element.text;
            }
        });
        return result;
    }

    navigationListener(e) {
        let connect = this.props.connect;
        e = e.detail;
        if (e['type'] === 'VKWebAppGoBack') {
            this.props.goBack();
            let canBack = false;
            if (this.props.panelBack.length > 0) {
                canBack = true;
            }
            connect.send('VKWebAppViewUpdateNavigationState', {"canBack": canBack, "canForward": true});

        } else if (e['type'] === 'VKWebAppGoForward') {
            this.props.goForward();
            let canForward = false;
            if (this.props.panelForward.length > 0) {
                canForward = true;
            }
            connect.send('VKWebAppViewUpdateNavigationState', {"canBack": true, "canForward": canForward});
        }
    }

    render() {
        let self = this;

        return (
            <UI.View popout={self.state.popout} activePanel={self.props.activePanel}>
                <UI.ScrollView id='Main'>
                    <NavigationBar connect={self.props.connect}/>
                    <Main categories={self.market.categories}
                          mainCategories={self.mainCategories}
                          offers={this.market.offers}
                          connect={self.props.connect}
                          parent={self}/>
                </UI.ScrollView>
                <UI.ScrollView id='Category'>
                    <NavigationBar connect={self.props.connect}/>
                    <Category connect={self.props.connect} parent={self}/>
                </UI.ScrollView>
                <UI.ScrollView id='ItemInfo'>
                    <NavigationBar connect={self.props.connect}/>
                    <ItemInfo connect={self.props.connect} parent={self}/>
                </UI.ScrollView>
                <UI.ScrollView id='Cart'>
                    <NavigationBar connect={self.props.connect}/>
                    <Cart parent={self} connect={self.props.connect}/>
                </UI.ScrollView>
            </UI.View>
        );
    }
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

export default App;
