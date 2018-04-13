import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './iteminfo.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import PropTypes from "prop-types";

class ItemInfo extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        price: PropTypes.number,
        categories: PropTypes.array,
    };

    render() {
        return (
            <div className='iteminfo-container'>
                <div className='iteminfo-info-container'>
                    <div className='iteminfo-name'>Nike Free X Metcon</div>
                    <div className='iteminfo-price'>8 840 руб.</div>
                    <div className='iteminfo-description'>Мужские кроссовки для тренинга Nike Free X Metcon - это сочетание гибкости и легкости в каждом движении.</div>

                    <div className='iteminfo-info'>
                        <div>Цвет модели: Atmosphere Grey</div>
                        <div>Модель: AH8141-004</div>
                        <div>Страна происхождения: Вьетнам</div>
                    </div>

                    <div className='iteminfo-option'>Размер</div>
                    <div className='iteminfo-select-container'>
                        <select className='iteminfo-select'>
                            <option className='iteminfo-select-option'>US 8 (RU 40)</option>
                        </select>
                    </div>
                </div>

                <div id='cart-button-item' className='cart-button-container-item'>
                    <UI.Button appearance="vk-rich" className='cart-button-item'
                               onClick={() => {} }>Добавить в корзину</UI.Button>
                </div>
            </div>
        );
    }
}

export default ItemInfo;
