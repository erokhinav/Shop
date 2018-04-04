import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './navigationbar.css';

import { colors } from '@vkontakte/vkui';
import IconChevron_back28 from '@vkontakte/vkui/dist/icons/28/chevron_back';
import IconFavorite_outline24 from '@vkontakte/vkui/dist/icons/24/favorite_outline';
import IconFavorite24 from '@vkontakte/vkui/dist/icons/24/favorite';
import Icon16Dropdown from '@vkontakte/vkui/dist/icons/16/dropdown';
import Icon24Market from '@vkontakte/vkui/dist/icons/24/market';

class NavigationBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className='header-pain'>
                    <UI.Pane>
                        <div className='select-box'>
                            <select className='select-city'>
                                <option>Москва</option>
                            </select>
                        </div>
                        <div className='cart-button'>
                            <div className='cart-button-text'>3 товара</div>
                            <Icon24Market fill={colors.captionGray} className='cart-button-icon'/>
                        </div>
                    </UI.Pane>
                </div>

                <div className='footer'>
                    <div className='icon-container'>
                        <IconChevron_back28 className='back-icon'
                                            fill={this.props.backView === undefined ? colors.separator : colors.headerBlue}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default NavigationBar;

