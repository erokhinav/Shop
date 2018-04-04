import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Main from './Main';
import NavigationBar from './NavigationBar';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activePanel: 'Main',
        };
    }

    render() {
        let self = this;

        return (
            <UI.View activePanel={self.state.activePanel}>
                <UI.ScrollView id='Main'>
                    <Main />
                    <NavigationBar/>
                </UI.ScrollView>
            </UI.View>
        );
    }
}

export default App;
