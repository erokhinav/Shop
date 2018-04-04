import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './main.css';

import { colors } from '@vkontakte/vkui';

class Cart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <UI.Group>
                    <UI.Header className='group-header' level='2'>
                        <div className='group-title'>
                            Корзина
                        </div>
                    </UI.Header>
                </UI.Group>
            </div>
        )
    }
}

export default Cart;

