import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './category.css';

import { colors } from '@vkontakte/vkui';

class Category extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <UI.Group className='category'>
                <UI.Header className='group-header' level='1'>
                    <div className='group-title'>
                        В спортивном стиле
                    </div>
                </UI.Header>

                <UI.List>
                    <div className='items-container'>
                        <div className='item-wrap'>
                            <div className='item-container'>
                                    <img className='item-photo' src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                                <div className='item-info'>
                                    <div className='item-name'>Nike Air Max 270 Flyknit</div>
                                    <div className='item-price'>8 800 руб.</div>
                                </div>
                            </div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item-container'>
                                <img className='item-photo' src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                                <div className='item-info'>
                                    <div className='item-name'>Nike Air Max 270 Flyknit</div>
                                    <div className='item-price'>8 800 руб.</div>
                                </div>
                            </div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item-container'>
                                <img className='item-photo' src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                                <div className='item-info'>
                                    <div className='item-name'>Nike Air Max 270 Flyknit</div>
                                    <div className='item-price'>8 800 руб.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </UI.List>
            </UI.Group>
        )
    }
}

export default Category;

