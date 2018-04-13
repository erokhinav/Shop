import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import NavigationBar from './NavigationBar';
import Main from './Main';
import Category from './Category';
import ItemInfo from './ItemInfo';
import Cart from './Cart';
import PropTypes from "prop-types";
import { parse } from './lib/yandex';

class App extends React.Component {

    static propTypes = {
        currency: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            activePanel: 'Main',
        };

        this.market = parse('/yandex.yml');
        console.log(this.market);

        this.categories = this.formatCategories(this.market);
    }

    formatCategories(market) {
        let offers = market.offers;
        let categories = market.categories;
        let result = [];
        categories.forEach(function (element, index) {
            result[index] = {offers: []};
        });
        offers.forEach(function (element) {
            result[element.categoryId].offers.push(element);
        });
        categories.forEach(function (element, index) {
            result[index].name = element.text;
        });
        console.log(result);
        return result;
    }

    render() {
        let self = this;

        return (
            <UI.View activePanel={self.state.activePanel}>
                <UI.ScrollView id='Main'>
                    <Main categories={this.categories}/>
                    <NavigationBar/>
                </UI.ScrollView>
                <UI.ScrollView id='Category'>
                    <Category />
                    <NavigationBar/>
                </UI.ScrollView>
                <UI.ScrollView id='ItemInfo'>
                    <ItemInfo />
                    <NavigationBar/>
                </UI.ScrollView>
                <UI.ScrollView id='Cart'>
                    <Cart />
                    <NavigationBar/>
                </UI.ScrollView>
            </UI.View>
        );
    }
}

export default App;
