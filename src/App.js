import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import NavigationBar from './NavigationBar';
import Main from './Main';
import Category from './Category';
import {parse} from "./lib/yandex";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activePanel: 'Category',
        };

        this.market = parse('/yandex.yml');
        console.log(this.market);
    }

    render() {
        let self = this;

        return (
            <UI.View activePanel={self.state.activePanel}>
                <UI.ScrollView id='Main'>
                    <Main/>
                    <NavigationBar/>
                </UI.ScrollView>
                <UI.ScrollView id='Category'>
                    {self.market.categories.map(category =>
                        <Category title={category.text}/>
                    )}
                    <NavigationBar/>
                </UI.ScrollView>
            </UI.View>
        );
    }
}

export default App;
