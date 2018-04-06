import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import NavigationBar from './NavigationBar';
import Main from './Main';
import Category from './Category';

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
