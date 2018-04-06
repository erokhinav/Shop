import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './cart.css';

import { colors } from '@vkontakte/vkui';

class Cart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='cart'>
                <UI.Group>
                    <UI.Header className='group-header' level='1'>
                        <div className='group-title'>
                            Корзина
                        </div>
                    </UI.Header>

                    <UI.List>
                        <UI.ListItem>
                            <div className='cart-item'>
                                <img className='cart-item-image' src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                                <div className='cart-item-info'>
                                    <div className='cart-item-name'>Nike Air Max 270 Flyknit</div>
                                    <div className='cart-item-options'>
                                        <div className='cart-select-container'>
                                            <select className='cart-select'>
                                                <option className='cart-select-option'>US 8 (RU 40)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='cart-item-price'>
                                        <div className='cart-item-price-current'>4 840 руб.</div>
                                    </div>
                                </div>
                            </div>
                        </UI.ListItem>
                        <UI.ListItem>
                            <div className='cart-item'>
                                <img className='cart-item-image' src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                                <div className='cart-item-info'>
                                    <div className='cart-item-name'>Nike Air Max 270 Flyknit</div>
                                    <div className='cart-item-options'>
                                        <div className='cart-select-container'>
                                            <select className='cart-select'>
                                                <option className='cart-select-option'>M</option>
                                            </select>
                                        </div>
                                        <div className='cart-select-container'>
                                            <select className='cart-select'>
                                                <option className='cart-select-option'>2 пары</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='cart-item-price'>
                                        <div className='cart-item-price-current'>4 840 руб.</div>
                                    </div>
                                </div>
                            </div>
                        </UI.ListItem>
                    </UI.List>

                    <div className='cart-sum'>
                        3 товара на сумму (без доставки) <div className='cart-sum-value'>44 520 руб.</div>
                    </div>
                </UI.Group>

                <div id='cart-button-item' className='cart-button-container-item'>
                    <UI.Button appearance="vk-rich" className='cart-button-item'
                               onClick={() => {} }>Оформить заказ</UI.Button>
                </div>
            </div>
        )
    }
}

export default Cart;

