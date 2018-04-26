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
import {setCategory, setCategoryIndex} from "../redux/actions";

const mapStateToProps = state => {
    return {
        activePanel: state.activePanel,
        categoryIndex: state.categoryIndex,
        category: state.category,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCategoryIndex: index => dispatch(setCategoryIndex(index)),
        setCategory: category => dispatch(setCategory(category)),
    };
};

class ConnectedApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popout: null,
        };

        this.market = parse('/yandex.yml');
        console.log(this.market);

        this.mainCategories = this.formatMainCategories(this.market);
        // console.log(Object.keys(this.mainCategories)[0]);

        let categories = this.mainCategories;
        for (let index in categories) {
            if (categories.hasOwnProperty(index)) {
                categories[index]['key'] = index;
            }
        }

        let minIndex = Object.keys(this.mainCategories)[0];
        this.props.setCategoryIndex(minIndex);
        this.props.setCategory(this.mainCategories[minIndex]);
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

    render() {
        let self = this;

        return (
            <UI.View popout={self.state.popout} activePanel={self.props.activePanel}>
                <UI.ScrollView id='Main'>
                    <NavigationBar/>
                    <Main categories={self.market.categories} mainCategories={self.mainCategories} offers={this.market.offers}/>
                </UI.ScrollView>
                <UI.ScrollView id='Category'>
                    <NavigationBar/>
                    <Category />
                </UI.ScrollView>
                <UI.ScrollView id='ItemInfo'>
                    <NavigationBar/>
                    <ItemInfo />
                </UI.ScrollView>
                <UI.ScrollView id='Cart'>
                    <NavigationBar/>
                    <Cart parent={self}/>
                </UI.ScrollView>
            </UI.View>
        );
    }
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

export default App;
