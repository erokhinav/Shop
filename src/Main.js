import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './main.css';

import { colors } from '@vkontakte/vkui';

class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <UI.Group>
                    <UI.Header className='group-header' level='1' aside={
                        <span className='all-items'
                              style={{ color: colors.accentBlue }}
                              onClick={ () => {} }>
                                Показать все
                            </span>
                    }>
                        <div className='group-title font'>
                            Для вас
                        </div>
                    </UI.Header>

                    <UI.Gallery slideWidth='300px' style={{ height: 200 }} className='gallery-wrap'>
                    {
                        <div className='gallery-container'>
                            <img className='foryou-image'
                                 src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                            <div>Air Jordan XI LOW</div>
                            <div>Роскошная модель XI возвращается!</div>
                        </div>
                    }
                    </UI.Gallery>
                </UI.Group>

                <UI.Group>
                    <UI.Header className='group-header' level='1' aside={
                        <span className='all-items'
                              style={{ color: colors.accentBlue }}
                              onClick={ () => {} }>
                                Показать все
                            </span>
                    }>
                        <div className='group-title font'>
                            Популярное
                        </div>
                    </UI.Header>

                    <UI.Gallery slideWidth='150px' style={{ height: 300 }} className='gallery-wrap'>
                        {
                            <div className='gallery-container'>
                                <img className='popular-image'
                                     src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                                <div>Air Jordan XI LOW</div>
                                <div>Роскошная модель XI возвращается!</div>
                            </div>
                        }
                    </UI.Gallery>
                </UI.Group>
            </div>
        )
    }
}

export default Main;

